import { render, screen, within } from "@testing-library/react";
import { TodoContainer } from ".";
import {
  insertTestTodos,
  makeTestTodoRepository,
} from "@/core/__tests__/utils/make-test-todo-repository";

describe("<TodoContainer /> (integration)", () => {
  beforeEach(async () => {
    const { cleanDatabase } = await makeTestTodoRepository();
    await cleanDatabase();
    await insertTestTodos();
  });

  afterAll(async () => {
    const { cleanDatabase } = await makeTestTodoRepository();
    await cleanDatabase();
  });

  it("should render TodoList and TodoForm on screen", async () => {
    // ARRANGE
    render(await TodoContainer());

    // ACT
    const headingAccessibleName = "to-do list";
    const heading = screen.getByRole("heading", {
      name: headingAccessibleName,
    });

    const list = screen.getByRole("list", { name: headingAccessibleName });
    const listItems = within(list).getAllByRole("listitem");
    const input = screen.getByLabelText("Task");
    const btn = screen.getByRole("button", { name: "Create Task" });

    // ASSERT
    expect(heading).toHaveTextContent(headingAccessibleName);
    expect(list).toHaveAttribute("aria-labelledby", heading.id);
    expect(listItems).toHaveLength(5);
    expect(input).toHaveAttribute("placeholder", "Type your task");
    expect(btn).toHaveAttribute("type", "submit");
  });
});
