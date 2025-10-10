import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
// Anotation: https://github.com/luizomf/the-blog-next-react-course
const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <div className="max-w-screen-md mx-auto p-12 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Hello StoryBook",
    variant: "default",
    size: "lg",
  },
};

export const Danger: Story = {
  args: {
    children: "Hello StoryBook",
    variant: "danger",
    size: "lg",
  },
};

export const Ghost: Story = {
  args: {
    children: "Hello StoryBook",
    variant: "ghost",
    size: "lg",
  },
};
