import { randomUUID } from "crypto";
import { TodoDto } from "../schemas/todo.dto";

export function makeNewTodo(description: string): TodoDto {
  return {
    id: randomUUID(),
    description,
    createdAt: new Date().toISOString(),
  };
}
