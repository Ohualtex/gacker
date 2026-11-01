import type { Locale } from "@/lib/i18n";

export type AssistantStrings = {
  launcher: string;
  title: string;
  disclaimer: string;
  close: string;
  clear: string;
  inputLabel: string;
  placeholder: string;
  send: string;
  typing: string;
  retry: string;
  greeting: string;
  you: string;
  assistant: string;
  starters: [string, string, string];
  errors: {
    not_configured: string;
    rate_limited: string;
    timeout: string;
    network: string;
    upstream: string;
    invalid: string;
  };
};

export const assistantContent: Record<Locale, AssistantStrings> = {
  tr: {
    launcher: "Bana sor",
    title: "Gakkocan",
    disclaimer: "Yapay zekâ asistanı, yanılabilir.",
    close: "Sohbeti kapat",
    clear: "Sohbeti temizle",
    inputLabel: "Mesajınız",
    placeholder: "Badem şekeri hakkında sorun…",
    send: "Gönder",
    typing: "yazıyor…",
    retry: "Tekrar dene",
    greeting:
      "Hoş geldin, ben Gakkocan! Badem şekeri, hediye geleneği ve Elazığ hakkında bildiklerimi anlatırım, buyur. Bilmediğimi de açıkça söylerim.",
    you: "Siz",
    assistant: "Badem Rehberi",
    starters: [
      "Badem şekeri nedir?",
      "Hediye olarak neden verilir?",
      "Elazığ'da üretici nasıl bulurum?",
    ],
    errors: {
      not_configured:
        "Yapay zekâ asistanı henüz etkinleştirilmedi, bu yüzden şu an cevap veremiyorum. Siteyi gezmeye devam edebilirsiniz; Hikâye ve Üreticiler sayfaları açık.",
      rate_limited: "Kısa sürede çok fazla soru sordunuz. Birkaç dakika sonra yeniden deneyin.",
      timeout: "Cevap çok uzun sürdü. Lütfen tekrar deneyin.",
      network: "Bağlantı kurulamadı. İnternetinizi kontrol edip tekrar deneyin.",
      upstream: "Asistan şu an yanıt veremiyor. Biraz sonra tekrar deneyin.",
      invalid: "Mesajınız gönderilemedi. Daha kısa bir soru yazmayı deneyin.",
    },
  },
  en: {
    launcher: "Ask me",
    title: "Gakkocan",
    disclaimer: "AI assistant, may be wrong.",
    close: "Close chat",
    clear: "Clear chat",
    inputLabel: "Your message",
    placeholder: "Ask about almond candy…",
    send: "Send",
    typing: "typing…",
    retry: "Try again",
    greeting:
      "Welcome, I'm Gakkocan! I can tell you what I know about almond candy, gift traditions and Elazığ. If I don't know something, I'll say so.",
    you: "You",
    assistant: "Almond Guide",
    starters: [
      "What is almond candy?",
      "Why is it given as a gift?",
      "How do I find a producer in Elazığ?",
    ],
    errors: {
      not_configured:
        "The AI assistant isn't switched on yet, so I can't answer right now. Feel free to keep exploring the site; the Story and Producers pages are open.",
      rate_limited: "You've asked a lot of questions in a short time. Please try again in a few minutes.",
      timeout: "The answer took too long. Please try again.",
      network: "Couldn't connect. Check your internet and try again.",
      upstream: "The assistant can't respond right now. Please try again shortly.",
      invalid: "Your message couldn't be sent. Try a shorter question.",
    },
  },
};
