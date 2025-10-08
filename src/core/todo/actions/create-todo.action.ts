"use server";
import { revalidatePath } from "next/cache";
import { createTodoUseCase } from "../usecases/create-todo.usecase";

export async function createTodoAction(description: string) {
  const createResult = await createTodoUseCase(description);

  if (createResult.success) {
    revalidatePath("/");
  }

  return createResult;
}
