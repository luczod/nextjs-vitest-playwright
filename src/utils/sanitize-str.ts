export function sanitizeStr(s: string): string {
  console.log("Call original function", s);
  const cleaned = !s || typeof s !== "string" ? "" : s.trim().normalize();
  return cleaned;
}
