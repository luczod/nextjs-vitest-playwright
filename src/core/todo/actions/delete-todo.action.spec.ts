import { deleteTodoAction } from "./delete-todo.action";
import { makeTestTodoMocks } from "@/core/__tests__/utils/make-test-todo-mocks";

vi.mock("next/cache", () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe("deleteTodoAction (unit)", () => {
  it("should call deleteTodoUseCase with correct values", async () => {
    // ARRANGE
    const { deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const fakeID = "any-id";

    // ACT
    await deleteTodoAction(fakeID);

    // ASSERT
    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(fakeID);
  });

  it("should call revalidatePath if usecase return successful", async () => {
    // ARRANGE
    const { revalidatePathMocked } = makeTestTodoMocks();
    const fakeID = "any-id";

    // ACT
    await deleteTodoAction(fakeID);

    // ASSERT});
    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith("/");
  });

  it("should return the same value as the usecase on success", async () => {
    // ARRANGE
    const { successResult } = makeTestTodoMocks();
    const fakeID = "any-id";

    // ACT
    const result = await deleteTodoAction(fakeID);

    // ASSERT});
    expect(result).toStrictEqual(successResult);
  });

  it("should return the same value as the usecase on error", async () => {
    // ARRANGE
    const { deleteTodoUseCaseSpy, errorResult } = makeTestTodoMocks();
    const fakeID = "any-id";
    deleteTodoUseCaseSpy.mockResolvedValue(errorResult);

    // ACT
    const result = await deleteTodoAction(fakeID);

    // ASSERT});
    expect(result).toStrictEqual(errorResult);
  });
});
