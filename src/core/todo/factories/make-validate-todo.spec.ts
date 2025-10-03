import { makeValidateTodo } from "./make-validate-todo";
import * as sanitizeStrMod from "@/utils/sanitize-str";

describe("makeValidatedTodo (unit)", () => {
  it("should call sanitizeStr function with correct value", () => {
    // ARRANGE
    const description = "abcdef";
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrMod, "sanitizeStr")
      .mockReturnValue(description);

    // ACT
    makeValidateTodo(description);

    // ASSERT
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
  });
  it("should call validateTodoDescription with sanitizeStr return", () => {});
  it("should call makeNewTodo if validateTodoDescription return success", () => {});
  it("should return validateTodoDescription.error  if validation fail", () => {});
});
