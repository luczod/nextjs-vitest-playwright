import { DrizzleDatabase } from "@/db";
import { TTodo, TodoDTO } from "../schemas/todo.dto";
import { ITodoRepository } from "./todo.contract.repository";
import { todoTable } from "../schemas/drizzle-todo-table.schema";
import { eq } from "drizzle-orm";

export class DrizzleTodoRepository implements ITodoRepository {
  private readonly db: DrizzleDatabase;

  constructor(db: DrizzleDatabase) {
    this.db = db;
  }

  findAll(): Promise<TTodo[]> {
    return this.db.query.todo.findMany({
      orderBy: (todo, { desc }) => [
        desc(todo.createdAt),
        desc(todo.description),
      ],
    });
  }

  async create(todoData: TTodo): Promise<TodoDTO> {
    const existingTodo = await this.db.query.todo.findFirst({
      where: (todoTable, { eq, or }) =>
        or(
          eq(todoTable.id, todoData.id),
          eq(todoTable.description, todoData.description)
        ),
    });

    if (!!existingTodo) {
      return {
        success: false,
        errors: ["A todo with the submitted ID or description already exists"],
      };
    }

    await this.db.insert(todoTable).values(todoData);

    return { success: true, todo: todoData };
  }

  async remove(id: string): Promise<TodoDTO> {
    const existingTodo = await this.db.query.todo.findFirst({
      where: (todoTable, { eq }) => eq(todoTable.id, id),
    });

    if (!existingTodo) {
      return {
        success: false,
        errors: ["Todo does not exist"],
      };
    }

    await this.db.delete(todoTable).where(eq(todoTable.id, id));

    return {
      success: true,
      todo: existingTodo,
    };
  }
}
