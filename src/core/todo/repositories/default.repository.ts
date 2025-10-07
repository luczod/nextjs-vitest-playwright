import { drizzleDatabase } from "@/db";
import { DrizzleTodoRepository } from "./drizzle-todo.repository";
import { ITodoRepository } from "./todo.contract.repository";

export const todoRepository: ITodoRepository = new DrizzleTodoRepository(
  drizzleDatabase.db
);
