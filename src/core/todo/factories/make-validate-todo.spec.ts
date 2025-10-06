import {
  makeValidateTodo,
  TInvalidTodo,
  TValidTodo,
} from "./make-validate-todo";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";
import * as sanitizeStrMod from "@/utils/sanitize-str";
import * as makeNewTodoMod from "./make-new-todo";

describe("makeValidatedTodo (unit)", () => {
  it("should call sanitizeStr function with correct value", () => {
    // ARRANGE
    const { description, sanitizeStrSpy } = makeMocks();

    // ACT
    makeValidateTodo(description);

    // ASSERT
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
  });

  it("should call validateTodoDescription with sanitizeStr return", () => {
    // ARRANGE
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();
    const sanitizeReturn = "Clean description";
    sanitizeStrSpy.mockReturnValue(sanitizeReturn);

    // ACT
    makeValidateTodo(description) as TValidTodo;

    // ASSERT
    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeReturn
    );
  });

  it("should call makeNewTodo if validateTodoDescription return success", () => {
    // ARRANGE
    const { description } = makeMocks();

    // ACT
    const result = makeValidateTodo(description) as TValidTodo;

    // ASSERT
    expect(result.success).toBe(true);

    expect(result.todo).toStrictEqual({
      id: "any-id",
      description: "abcdef",
      createdAt: expect.any(String),
    });
  });

  it("should return validateTodoDescription.error  if validation fail", () => {
    // ARRANGE
    const { description, errors, validateTodoDescriptionSpy } = makeMocks();

    validateTodoDescriptionSpy.mockReturnValue({
      success: false,
      errors,
    });

    // ACT
    const result = makeValidateTodo(description) as TInvalidTodo;

    // ASSERT
    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual(errors);
  });
});

const makeMocks = (description = "abcdef") => {
  const todo = {
    id: "any-id",
    description,
    createdAt: new Date().toISOString(),
  };
  const errors = ["Description must have more than 3 characters"];
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);

  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, "validateTodoDescription")
    .mockReturnValue({
      success: true,
      errors: [],
    });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, "makeNewTodo")
    .mockReturnValue(todo);

  return {
    description,
    todo,
    errors,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};
