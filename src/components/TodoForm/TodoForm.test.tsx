import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from ".";

const user = userEvent.setup();

// npx vitest src/components/TodoForm/TodoForm.test.tsx:10

describe("<TodoForm /> (integration)", () => {
  it("should render all form components", async () => {
    // ARRANGE
    const { btn, input } = renderForm();

    // ASSERT
    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("should call the action with the correct values", async () => {
    // ARRANGE
    const { btn, input, action } = renderForm();

    // ACT
    await user.type(input, "task");
    await user.click(btn);

    // ASSERT
    expect(action).toHaveBeenCalledExactlyOnceWith("task");
  });

  it("must trim spaces from the beginning and end of the description", async () => {
    // ARRANGE
    const { btn, input, action } = renderForm();

    // ACT
    await user.type(input, "   task    ");
    await user.click(btn);

    // ASSERT
    expect(action).toHaveBeenCalledExactlyOnceWith("task");
  });

  it("should clear the input if the form returns success", async () => {
    // ARRANGE
    const { btn, input } = renderForm();

    // ACT
    await user.type(input, "   task    ");
    await user.click(btn);

    // ASSERT
    expect(input).toHaveValue("");
  });

  it("must disable the button while sending the action", async () => {
    // ARRANGE
    const { btn, input } = renderForm({ delay: 5 });

    // ACT
    await user.type(input, "task");
    await user.click(btn);

    // ASSERT
    await waitFor(() => expect(btn).toBeDisabled());
    await waitFor(() => expect(btn).toBeEnabled());
  });

  it("must disable the input while sending the action", async () => {
    // ARRANGE
    const { btn, input } = renderForm({ delay: 1000 });

    // ACT
    await user.type(input, "task");
    await user.click(btn);

    // ASSERT
    await waitFor(() => expect(input).toBeDisabled());
    await waitFor(() => expect(input).toBeEnabled());
  });

  it("must change the button text while sending the action", async () => {
    // ARRANGE
    const { btn, input } = renderForm({ delay: 10 });

    // ACT
    await user.type(input, "task");
    await user.click(btn);

    // ASSERT
    await waitFor(() => expect(btn).toHaveAccessibleName("Creating a task..."));
    await waitFor(() => expect(btn).toHaveAccessibleName("Create Task"));
  });

  it("should show the error when the action returns error", async () => {
    // ARRANGE
    const { btn, input } = renderForm({ success: false });

    // ACT
    await user.type(input, "task");
    await user.click(btn);

    const error = await screen.findByRole("alert"); // recommended to async operations

    // ASSERT
    expect(error).toHaveTextContent("failed to create TODO");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });

  it("must keep the text typed in the input if the action returns an error", async () => {
    // ARRANGE
    const { btn, input } = renderForm({ success: false });

    // ACT
    await user.type(input, "task");
    await user.click(btn);

    // ASSERT
    expect(input).toHaveValue("task");
  });
});

type RenderForm = {
  delay?: number;
  success?: boolean;
};

function renderForm({ delay = 0, success = true }: RenderForm = {}) {
  const actionSuccessResult = {
    success: true,
    todo: { id: "id", description: "description", createdAt: "createdAt" },
  };

  const actionErrorResult = {
    success: false,
    errors: ["failed to create TODO"],
  };

  const actionResult = success ? actionSuccessResult : actionErrorResult;

  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);

  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise((r) => setTimeout(r, delay));
    console.log("CALL ACTIONDELAYED");
    return actionResult;
  });

  const action = delay > 0 ? actionDelayed : actionNoDelay;

  render(<TodoForm action={action} />);

  const input = screen.getByLabelText("Task");
  const btn = screen.getByRole("button");

  return { btn, input, action };
}
