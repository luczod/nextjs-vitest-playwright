import { sanitizeStr } from "@/utils/sanitize-str";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";
import { TodoDTO } from "../schemas/todo.dto";

export function makeValidatedTodo(description: string): TodoDTO {
  const cleanDescription = sanitizeStr(description);
  const validateDescription = validateTodoDescription(cleanDescription);

  if (validateDescription.success) {
    return {
      success: true,
      todo: makeNewTodo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validateDescription.errors,
  };
}
