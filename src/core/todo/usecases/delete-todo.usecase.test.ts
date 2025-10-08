import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { deleteTodoUseCase } from "./delete-todo.usecase";

describe("deleteTodoUseCase (integration)", () => {
  beforeEach(async () => {
    const { cleanDatabase } = await makeTestTodoRepository();
    await cleanDatabase();
  });

  afterAll(async () => {
    const { cleanDatabase } = await makeTestTodoRepository();
    await cleanDatabase();
  });

  it("should return error if ID is invalid", async () => {
    // ACT
    const result = await deleteTodoUseCase("");

    // ASSERT
    expect(result).toStrictEqual({ success: false, errors: ["ID invalid"] });
  });

  it("should return success if the TODO exists in the database", async () => {
    // ACT
    const result = await deleteTodoUseCase("this-does-not-exist");

    // ASSERT
    expect(result).toStrictEqual({
      errors: ["Todo does not exist"],
      success: false,
    });
  });
});
