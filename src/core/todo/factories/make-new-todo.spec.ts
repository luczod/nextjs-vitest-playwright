import { makeNewTodo } from "./make-new-todo";

// AAA -> Arrange, Act, Assert
describe("makeNewTodo (unit)", () => {
  it("should return a new valid Todo", () => {
    // Arrange -> Create the things that I need
    const expectedTodo = {
      id: expect.any(String),
      description: "my new item",
      createdAt: expect.any(String),
    };

    // Act
    const newTodo = makeNewTodo("my new item");

    // Assert
    // toBe -> primitive
    // toEqual or toStrictEqual -> objects
    expect(newTodo.description).toBe(expectedTodo.description);

    // Check whoe object
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
