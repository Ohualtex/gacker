import { buildSystemPrompt } from "@/lib/assistant-prompt";
import { hasLocale, type Locale } from "@/lib/i18n";

/**
 * POST /api/chat  { messages: [{ role, content }], lang: 'tr' | 'en' }
 *
 * OpenAI uyumlu bir chat-completions uç noktasına akışlı (stream) istek atar ve
 * sadeleştirilmiş SSE olaylarını istemciye iletir:
 *   data: {"delta":"..."}   metin parçası
 *   data: {"error":"..."}   akış sırasında hata
 *   data: [DONE]            bitti
 * API anahtarı yalnızca sunucuda okunur ve istemciye asla gönderilmez.
 */

const MAX_MESSAGES = 20;
const MAX_CONTENT = 1000;
const MAX_BODY_BYTES = 40_000;
const UPSTREAM_TIMEOUT_MS = 15_000;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAP_CAP = 5_000;

type ChatMessage = { role: "user" | "assistant"; content: string };

const globalForRate = globalThis as unknown as { __gkChatHits?: Map<string, number[]> };
const hits = (globalForRate.__gkChatHits ??= new Map<string, number[]>());

const json = (body: Record<string, unknown>, status: number, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}

/** Kayan pencere. Sınır aşılırsa kaç saniye sonra tekrar denenebileceğini döndürür. */
function checkRateLimit(ip: string): number | null {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return Math.ceil((RATE_WINDOW_MS - (now - recent[0])) / 1000);
  }
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > RATE_MAP_CAP) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return null;
}

function validate(
  input: unknown,
): { ok: true; messages: ChatMessage[]; lang: Locale } | { ok: false; detail: string } {
  if (typeof input !== "object" || input === null) return { ok: false, detail: "body_must_be_object" };
  const { messages, lang } = input as { messages?: unknown; lang?: unknown };

  if (typeof lang !== "string" || !hasLocale(lang)) return { ok: false, detail: "lang_must_be_tr_or_en" };
  if (!Array.isArray(messages) || messages.length === 0) return { ok: false, detail: "messages_required" };
  if (messages.length > MAX_MESSAGES) return { ok: false, detail: "too_many_messages" };

  const clean: ChatMessage[] = [];
  for (const m of messages) {
    if (typeof m !== "object" || m === null) return { ok: false, detail: "invalid_message" };
    const { role, content } = m as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return { ok: false, detail: "invalid_role" };
    if (typeof content !== "string") return { ok: false, detail: "invalid_content" };
    const text = content.trim();
    if (text.length === 0) return { ok: false, detail: "empty_content" };
    if (text.length > MAX_CONTENT) return { ok: false, detail: "content_too_long" };
    clean.push({ role, content: text });
  }
  if (clean[clean.length - 1].role !== "user") return { ok: false, detail: "last_must_be_user" };
  return { ok: true, messages: clean, lang };
}

export async function POST(request: Request) {
  // 1) Girdi doğrulama
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ error: "invalid_request", detail: "unreadable_body" }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) return json({ error: "invalid_request", detail: "body_too_large" }, 413);

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ error: "invalid_request", detail: "invalid_json" }, 400);
  }
  const result = validate(parsed);
  if (!result.ok) return json({ error: "invalid_request", detail: result.detail }, 400);

  // 2) Yapılandırma: anahtar yoksa dürüstçe 503
  const apiKey = process.env.LLM_API_KEY?.trim();
  if (!apiKey) return json({ error: "not_configured" }, 503);
  const baseUrl = (process.env.LLM_BASE_URL?.trim() || "https://api.openai.com/v1").replace(/\/+$/, "");
  const model = process.env.LLM_MODEL?.trim() || "gpt-4o-mini";

  // 3) IP başına hız sınırı
  const retryAfter = checkRateLimit(clientIp(request));
  if (retryAfter !== null) {
    return json({ error: "rate_limited", retryAfter }, 429, { "Retry-After": String(retryAfter) });
  }

  // 4) Üst akışa istek: 15 sn'lik boşta kalma zaman aşımı (her parçada sıfırlanır)
  const upstreamAbort = new AbortController();
  let timedOut = false;
  let timer: ReturnType<typeof setTimeout>;
  const armTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timedOut = true;
      upstreamAbort.abort();
    }, UPSTREAM_TIMEOUT_MS);
  };
  const onClientAbort = () => upstreamAbort.abort();
  request.signal.addEventListener("abort", onClientAbort);
  const cleanup = () => {
    clearTimeout(timer);
    request.signal.removeEventListener("abort", onClientAbort);
  };

  armTimer();
  let upstream: Response;
  try {
    upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        stream: true,
        max_tokens: 600,
        // Gemini 2.5 "düşünme" jetonları yanıtı boğmasın (OpenAI-uyumlu uçta desteklenir)
        ...(/generativelanguage\.googleapis\.com/.test(baseUrl) ? { reasoning_effort: "none" } : {}),
        messages: [{ role: "system", content: buildSystemPrompt(result.lang) }, ...result.messages],
      }),
      signal: upstreamAbort.signal,
      cache: "no-store",
    });
  } catch {
    cleanup();
    return timedOut ? json({ error: "timeout" }, 504) : json({ error: "upstream_unreachable" }, 502);
  }

  if (!upstream.ok || !upstream.body) {
    cleanup();
    // Üst akışın ham hata gövdesi (anahtar ipuçları içerebilir) istemciye sızdırılmaz.
    console.error(`[api/chat] upstream responded ${upstream.status}`);
    return json({ error: "upstream_error", status: upstream.status }, 502);
  }

  // 5) Üst akış SSE'sini ayrıştırıp sade olaylara çevir
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  let finished = false;

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const send = (payload: string) => controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
      const finish = () => {
        finished = true;
        cleanup();
        controller.close();
      };
      try {
        while (!finished) {
          armTimer();
          const { done, value } = await reader.read();
          if (done) {
            send("[DONE]");
            return finish();
          }
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          let emitted = false;
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              send("[DONE]");
              await reader.cancel().catch(() => {});
              return finish();
            }
            try {
              const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta.length > 0) {
                send(JSON.stringify({ delta }));
                emitted = true;
              }
            } catch {
              // Bozuk parçayı atla
            }
          }
          if (emitted) return; // pull bir sonraki okumayı bekler (geri basınç)
        }
      } catch {
        send(JSON.stringify({ error: timedOut ? "timeout" : "stream_error" }));
        await reader.cancel().catch(() => {});
        finish();
      }
    },
    cancel() {
      finished = true;
      cleanup();
      reader.cancel().catch(() => {});
      upstreamAbort.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
