export function flattenStrings(obj: unknown, prefix = ""): { key: string; value: string }[] {
  const out: { key: string; value: string }[] = [];
  if (typeof obj === "string") {
    if (prefix) out.push({ key: prefix, value: obj });
    return out;
  }
  if (typeof obj === "function" || obj == null) return out;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      out.push(...flattenStrings(item, prefix ? `${prefix}.${i}` : String(i)));
    });
    return out;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      out.push(...flattenStrings(v, prefix ? `${prefix}.${k}` : k));
    }
  }
  return out;
}

export function setPath(target: Record<string, unknown>, path: string, value: string) {
  const parts = path.split(".");
  let cursor: Record<string, unknown> = target;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const next = cursor[part];
    if (typeof next !== "object" || next == null || Array.isArray(next)) return;
    cursor = next as Record<string, unknown>;
  }
  const last = parts[parts.length - 1];
  if (typeof cursor[last] === "string") cursor[last] = value;
}

export function groupOf(key: string) {
  return key.split(".")[0] ?? "site";
}
