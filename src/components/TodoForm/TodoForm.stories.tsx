import { TCreateTodoAction } from "@/core/todo/actions/todo.action.types";
import { TodoForm } from ".";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

function simulatePromise(delay: number) {
  return new Promise((resolve) => {
    // Simulate an asynchronous task using setTimeout
    setTimeout(() => {
      console.log(`Operation successful after ${delay}ms.`);
      resolve(`Data successfully fetched after ${delay}ms.`); // Resolve the promise with a value
    }, delay);
  });
}

const meta: Meta<typeof TodoForm> = {
  title: "Components/Forms/TodoForm",
  component: TodoForm,
  decorators: [
    (Story) => (
      <div className="max-w-screen-md mx-auto p-12">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    action: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TodoForm>;

export const Default: Story = {
  args: {
    action: fn(async () => {
      await simulatePromise(1000);
      return {
        success: true,
        todo: { id: "id", description: "desc", createdAt: "data" },
      };
    }) as TCreateTodoAction,
  },
};

export const WithError: Story = {
  args: {
    action: fn(async () => {
      return {
        success: false,
        errors: ["failed to create TODO"],
      };
    }) as TCreateTodoAction,
  },
};
