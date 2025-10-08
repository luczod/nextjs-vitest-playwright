import * as createTodoUseCaseMod from "@/core/todo/usecases/create-todo.usecase";
import { revalidatePath } from "next/cache";
import { TInvalidTodo, TValidTodo } from "../schemas/todo.dto";
import { createTodoAction } from "./create-todo.action";

vi.mock("next/cache", () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe("createTodoAction (unit)", () => {
  it("should call createTodoUseCase with correct values", async () => {
    // ARRANGE
    const { createTodoUseCaseSpy } = makeMocks();
    const expectedParamCall = "Usecase should be called with this";

    // ACT
    await createTodoAction(expectedParamCall);

    // ASSERT
    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall
    );
  });

  it("should call revalidatePath if usecase return successful", async () => {
    // ARRANGE
    const { revalidatePathMocked } = makeMocks();
    const description = "Usecase should be called with this";

    // ACT
    await createTodoAction(description);

    // ASSERT});
    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith("/");
  });

  it("should return the same value as the usecase on success", async () => {
    // ARRANGE
    const { successResult } = makeMocks();
    const description = "Usecase should be called with this";

    // ACT
    const result = await createTodoAction(description);

    // ASSERT});
    expect(result).toStrictEqual(successResult);
  });

  it("should return the same value as the usecase on error", async () => {
    // ARRANGE
    const { createTodoUseCaseSpy, errorResult } = makeMocks();
    const description = "Usecase should be called with this";
    createTodoUseCaseSpy.mockResolvedValue(errorResult);

    // ACT
    const result = await createTodoAction(description);

    // ASSERT});
    expect(result).toStrictEqual(errorResult);
  });
});

const makeMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: "id",
      description: "description",
      createdAt: "createdAt",
    },
  } as TValidTodo;

  const errorResult = {
    success: false,
    errors: ["any", "error"],
  } as TInvalidTodo;

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, "createTodoUseCase")
    .mockResolvedValue(successResult);

  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    successResult,
    errorResult,
    createTodoUseCaseSpy,
    revalidatePathMocked,
  };
};
