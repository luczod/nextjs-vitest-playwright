import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { createTodoUseCase } from "./create-todo-usecase";
import { TInvalidTodo, TValidTodo } from "../schemas/todo.dto";

describe("createTodoUseCase (integration)", () => {
  beforeEach(async () => {
    const { cleanDatabase } = await makeTestTodoRepository();
    await cleanDatabase();
  });

  afterAll(async () => {
    const { cleanDatabase } = await makeTestTodoRepository();
    await cleanDatabase();
  });

  it("should return error if validation fails", async () => {
    // ACT
    const result = (await createTodoUseCase("")) as TInvalidTodo;

    // ASSERT
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  it("should return the TODO if validation was successful", async () => {
    // ARRANGE
    const description = "example of valid description";

    // ACT
    const result = (await createTodoUseCase(description)) as TValidTodo;

    // ASSERT
    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      createdAt: expect.any(String),
      description,
      id: expect.any(String),
    });
  });

  it("should return error if repository fails", async () => {
    // ARRANGE -> Create the todo once
    const description = "example of valid description";
    (await createTodoUseCase(description)) as TValidTodo;

    // ACT -> Attempts to recreate the todo and MUST return error
    const result = (await createTodoUseCase(description)) as TInvalidTodo;

    // ASSERT
    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      "A todo with the submitted ID or description already exists",
    ]);
  });
});
