import { render, screen, waitFor, within } from "@testing-library/react";
import { TodoList } from ".";

import userEvent from "@testing-library/user-event";
import { TTodo } from "@/core/todo/schemas/todo.dto";
import { mockTodos } from "@/core/__tests__/mocks/todos";

const user = userEvent.setup();

describe("<TodoList /> (integration)", () => {
  it("should render heading, list and TODO list items", async () => {
    // ARRANGE
    const { todos } = renderList();

    // ACT
    const heading = screen.getByRole("heading", {
      name: /to-do list/i,
      level: 1,
    });
    const list = screen.getByRole("list", { name: /to-do list/i });
    const items = screen.getAllByRole("listitem");

    // ASSERT
    expect(heading).toBeInTheDocument();
    expect(list).toHaveAttribute("aria-labelledby", heading.id);

    expect(items).toHaveLength(todos.length);

    items.forEach((item, index) => {
      expect(item).toHaveTextContent(todos[index].description);
    });
  });

  it("should not render the list of items without TODOs", async () => {
    // ARRANGE
    renderList({ todos: [] });

    // ACT
    const list = screen.queryByRole("list", { name: /to-do list/i });

    // ASSERT
    expect(list).not.toBeInTheDocument();
  });

  it("must call the correct action for each item in the list", async () => {
    // ARRANGE
    const { action, todos } = renderList();

    // ACT
    const items = screen.getAllByRole("listitem");
    const btn0 = within(items[0]).getByRole("button");
    const btn1 = within(items[1]).getByRole("button");
    const btn2 = within(items[2]).getByRole("button");

    await user.click(btn0);
    await user.click(btn1);
    await user.click(btn2);

    // ASSERT
    expect(action).toHaveBeenCalledTimes(3);

    expect(action.mock.calls[0][0]).toBe(todos[0].id);
    expect(action.mock.calls[1][0]).toBe(todos[1].id);
    expect(action.mock.calls[2][0]).toBe(todos[2].id);
  });

  it("must disable the list items while sending the action", async () => {
    // ARRANGE
    renderList({ delay: 10 });

    // ACT
    const list = screen.getByRole("list", { name: /to-do list/i });
    const items = screen.getAllByRole("listitem");
    const btns = within(list).getAllByRole("button");
    await user.click(btns[1]);

    const expectedDisabledCls = "bg-gray-200 text-gray-900 hover:scale-100";
    const expectedEnabledCls = "bg-amber-200 text-amber-900 hover:scale-105";

    // ASSERT
    await waitFor(() => {
      items.forEach((item) => expect(item).toHaveClass(expectedDisabledCls));
    });

    await waitFor(() => {
      items.forEach((item) => expect(item).toHaveClass(expectedEnabledCls));
    });
  });

  it("must disable the list buttons while sending the action", async () => {
    // ARRANGE
    renderList({ delay: 10 });

    // ACT
    const list = screen.getByRole("list", { name: /to-do list/i });
    const btns = within(list).getAllByRole("button");
    await user.click(btns[1]);

    // ASSERT
    await waitFor(() => {
      btns.forEach((btn) => expect(btn).toBeDisabled());
    });

    await waitFor(() => {
      btns.forEach((btn) => expect(btn).toBeEnabled());
    });
  });

  it("must warn the user if there is an error when deleting the TODO", async () => {
    // ARRANGE
    renderList({ success: false });

    const alertFn = vi.fn();
    vi.stubGlobal("alert", alertFn);

    // ACT
    const btns = screen.getAllByRole("button");
    await user.click(btns[1]);

    // ASSERT
    expect(alertFn).toHaveBeenCalledExactlyOnceWith("failed to delete todo");
  });

  it("should not call the action if the ID is invalid, empty or made up of only spaces", async () => {
    // ARRANGE
    const { action } = renderList({
      todos: [{ id: "     ", description: "", createdAt: "" }],
    });

    const item = screen.getByRole("listitem");
    const btn = within(item).getByRole("button");

    // ACT
    await user.click(btn);

    // ASSERT
    expect(action).not.toHaveBeenCalled();
  });
});

type RenderListProps = {
  delay?: number;
  success?: boolean;
  todos?: TTodo[];
};

function renderList({
  delay = 0,
  success = true,
  todos = mockTodos,
}: RenderListProps = {}) {
  const newTodos = [...todos];
  const actionSuccessResult = {
    success: true,
    todo: { id: "id", description: "desc", createdAt: "createdAt" },
  };
  const actionErrorResult = {
    success: false,
    errors: ["failed to delete todo"],
  };
  const actionResult = success ? actionSuccessResult : actionErrorResult;
  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise((r) => setTimeout(r, delay));
    return actionResult;
  });
  const action = delay > 0 ? actionDelayed : actionNoDelay;

  const renderResult = render(<TodoList action={action} todos={newTodos} />);

  return { action, renderResult, todos: newTodos };
}
