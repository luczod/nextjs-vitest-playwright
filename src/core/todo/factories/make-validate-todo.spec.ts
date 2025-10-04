import { makeValidateTodo } from "./make-validate-todo";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";
import * as sanitizeStrMod from "@/utils/sanitize-str";
import * as makeNewTodoMod from "./make-new-todo";
import { randomUUID } from "crypto";

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

  it("should call validateTodoDescription with sanitizeStr return", () => {
    // ARRANGE
    const cleanDescription = "abcdef";
    const validateTodoDescriptionSpy = vi
      .spyOn(validateTodoDescriptionMod, "validateTodoDescription")
      .mockReturnValue({
        success: true,
        errors: [],
      });

    // ACT
    makeValidateTodo(cleanDescription);

    // ASSERT
    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      cleanDescription
    );
  });

  it("should call makeNewTodo if validateTodoDescription return success", () => {
    // ARRANGE
    const cleanDescription = "abcdef";
    vi.spyOn(
      validateTodoDescriptionMod,
      "validateTodoDescription"
    ).mockReturnValue({
      success: true,
      errors: [],
    });

    const makeNewTodoSpy = vi
      .spyOn(makeNewTodoMod, "makeNewTodo")
      .mockReturnValue({
        id: randomUUID(),
        description: cleanDescription,
        createdAt: new Date().toISOString(),
      });

    // ACT
    makeValidateTodo(cleanDescription);

    // ASSERT
    expect(makeNewTodoSpy).toHaveBeenCalledExactlyOnceWith(cleanDescription);
  });

  it("should return validateTodoDescription.error  if validation fail", () => {
    // ARRANGE
    const cleanDescription = "abc";
    vi.spyOn(
      validateTodoDescriptionMod,
      "validateTodoDescription"
    ).mockReturnValue({
      success: false,
      errors: ["Description must have more than 3 characters"],
    });

    // ACT
    const newTodo = makeValidateTodo(cleanDescription);

    // ASSERT
    expect(newTodo).toStrictEqual({
      success: false,
      errors: ["Description must have more than 3 characters"],
    });
  });
});
