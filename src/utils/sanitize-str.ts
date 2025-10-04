export function sanitizeStr(s: string): string {
  const cleaned = !s || typeof s !== "string" ? "" : s.trim().normalize();
  return cleaned;
}
