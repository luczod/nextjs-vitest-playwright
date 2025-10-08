import { makeTestTodoMocks } from "@/core/__tests__/utils/make-test-todo-mocks";
import { createTodoAction } from "./create-todo.action";

vi.mock("next/cache", () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe("createTodoAction (unit)", () => {
  it("should call createTodoUseCase with correct values", async () => {
    // ARRANGE
    const { createTodoUseCaseSpy } = makeTestTodoMocks();
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
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = "Usecase should be called with this";

    // ACT
    await createTodoAction(description);

    // ASSERT;
    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith("/");
  });

  it("should return the same value as the usecase on success", async () => {
    // ARRANGE
    const { successResult } = makeTestTodoMocks();
    const description = "Usecase should be called with this";

    // ACT
    const result = await createTodoAction(description);

    // ASSERT});
    expect(result).toStrictEqual(successResult);
  });

  it("should return the same value as the usecase on error", async () => {
    // ARRANGE
    const { createTodoUseCaseSpy, errorResult } = makeTestTodoMocks();
    const description = "Usecase should be called with this";
    createTodoUseCaseSpy.mockResolvedValue(errorResult);

    // ACT
    const result = await createTodoAction(description);

    // ASSERT});
    expect(result).toStrictEqual(errorResult);
  });
});
