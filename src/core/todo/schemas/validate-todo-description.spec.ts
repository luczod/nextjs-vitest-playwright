import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  it("should return errors when a description have less than 4 characters", () => {
    const description = "abc";
    const result = validateTodoDescription(description);

    expect(result.errors).toStrictEqual([
      "Description must have more than 3 characters",
    ]);

    expect(result.success).toBe(false);
  });

  it("should return sucess when a description have more than 3 characters", () => {
    const description = "abcdefg";
    const result = validateTodoDescription(description);
    expect(result.errors).toStrictEqual([]);
    expect(result.success).toBe(true);
  });
});
