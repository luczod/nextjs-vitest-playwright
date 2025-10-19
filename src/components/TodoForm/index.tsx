"use client";
import { TCreateTodoAction } from "@/core/todo/actions/todo.action.types";
import { sanitizeStr } from "@/utils/sanitize-str";
import { useRef, useState, useTransition } from "react";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { CirclePlusIcon } from "lucide-react";

export type TodoFormProps = {
  action: TCreateTodoAction;
};

export function TodoForm({ action }: TodoFormProps) {
  const [pending, startTransition] = useTransition();
  const [inputError, setInputError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  function handleCreateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const input = ref.current;

    if (!input) return;

    const description = sanitizeStr(input.value);

    startTransition(async () => {
      const result = await action(description);

      if (!result.success) {
        setInputError(result.errors[0]);
        return;
      }

      input.value = "";
      setInputError("");
    });
  }

  return (
    <form onSubmit={handleCreateTodo} className="flex flex-col flex-1 gap-6">
      <InputText
        name="description"
        labelText="Task"
        placeholder="Type your task"
        disabled={pending}
        errorMessage={inputError}
        ref={ref}
      />

      <Button type="submit" disabled={pending}>
        <CirclePlusIcon />
        {!pending && <span>Create Task</span>}
        {pending && <span>Creating a task...</span>}
      </Button>
    </form>
  );
}
