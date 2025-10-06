import { TodoDTO, TTodo } from "../schemas/todo.dto";

export interface FindAllTodoRepository {
  findAll(): Promise<TTodo[]>;
}

export interface CreateTodoRepository {
  create(todo: TTodo): Promise<TodoDTO>;
}

export interface DeleteTodoRepository {
  remove(id: string): Promise<TodoDTO>;
}

export interface ITodoRepository
  extends FindAllTodoRepository,
    CreateTodoRepository,
    DeleteTodoRepository {}
