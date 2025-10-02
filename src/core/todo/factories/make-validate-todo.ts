import { sanitizeStr } from "@/utils/sanitize-str";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";
import { TodoDto } from "../schemas/todo.dto";

type TInvalidTodo = {
  success: false;
  errors: string[];
};

type TValidTodo = {
  success: true;
  data: TodoDto;
};

type TMakeValidatedTodo = TValidTodo | TInvalidTodo;

export function makeValidateTodo(description: string): TMakeValidatedTodo {
  const cleanDescription = sanitizeStr(description);
  const validateDescription = validateTodoDescription(cleanDescription);

  if (validateDescription.success) {
    return {
      success: true,
      data: makeNewTodo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validateDescription.errors,
  };
}
