type TValidateTodoDescription = {
  success: boolean;
  errors: string[];
};

export function validateTodoDescription(
  description: string
): TValidateTodoDescription {
  const errors = [];

  if (description.length <= 3) {
    errors.push("Description must have more than 3 characters");
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
