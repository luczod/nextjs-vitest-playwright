import { randomUUID } from "crypto";

export function makeNewTodo(description: string) {
  return {
    id: randomUUID(),
    description,
    createdAt: new Date().toISOString(),
  };
}
