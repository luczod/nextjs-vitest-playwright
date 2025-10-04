import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr (unit)", () => {
  console.log("CURRENT_ENV=", process.env.CURRENT_ENV);
  it("return a empty string when receive a FALSE value", () => {
    // @ts-expect-error test function without params
    expect(sanitizeStr()).toBe("");
  });

  it("return a empty string when receive a NO STRING value", () => {
    // @ts-expect-error test function with number
    expect(sanitizeStr(4)).toBe("");
  });

  it("should return a trimmed string", () => {
    expect(sanitizeStr("   word ")).toBe("word");
  });

  it("should return a normalized string with NFC", () => {
    const original = "e\u0301";
    const expected = "é";
    expect(sanitizeStr(original)).toBe(expected);
  });
});
