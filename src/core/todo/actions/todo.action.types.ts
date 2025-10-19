import { createTodoAction } from "./create-todo.action";
import { deleteTodoAction } from "./delete-todo.action";

export type TCreateTodoAction = typeof createTodoAction;
export type TDeleteTodoAction = typeof deleteTodoAction;
