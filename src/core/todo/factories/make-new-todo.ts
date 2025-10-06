import { randomUUID } from "crypto";
import { TTodo } from "../schemas/todo.dto";

export function makeNewTodo(description: string): TTodo {
  return {
    id: randomUUID(),
    description,
    createdAt: new Date().toISOString(),
  };
}
