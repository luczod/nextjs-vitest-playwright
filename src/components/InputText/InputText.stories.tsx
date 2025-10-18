import { InputText } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputText> = {
  title: "Components/Forms/InputText",
  component: InputText,
  decorators: [
    (Story) => (
      <div className="max-w-screen-lg mx-auto p-12">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "tel", "url", "search"],
      description: "This is the input type",
    },
    labelText: {
      control: "text",
      description: "input label",
    },
    errorMessage: {
      control: "text",
      description: "Error message to user",
    },
    placeholder: {
      control: "text",
      description: "An example use for the input",
    },
    required: {
      control: "boolean",
      description: "field  is required",
    },
    disabled: {
      control: "boolean",
      description: "Field is disabled",
    },
    readOnly: {
      control: "boolean",
      description: "read only",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    type: "text",
    labelText: "Input Label",
    errorMessage: "",
    placeholder: "type something...",
    required: true,
    disabled: false,
    readOnly: false,
    defaultValue: "This is the default value of the input",
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: "This is the error message",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
};
