import { drizzleDatabase } from "@/db";
import { DrizzleTodoRepository } from "./drizzle-todo.repository";
import {
  insertTestTodos,
  makeTestTodoRepository,
} from "@/core/__tests__/utils/make-test-todo-repository";

// AAA -> Arrange, Act, Assert
describe("DrizzleTodoRepository (Integration)", () => {
  describe("findAll", () => {
    beforeEach(async () => {
      const { cleanDatabase } = await makeTestTodoRepository();
      await cleanDatabase();
    });

    afterAll(async () => {
      const { cleanDatabase } = await makeTestTodoRepository();
      await cleanDatabase();
    });

    it("should return a empty array if table is clean", async () => {
      // Arrange
      const repository = new DrizzleTodoRepository(drizzleDatabase.db);

      // Act
      const result = await repository.findAll();

      //Assert
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should return all TODOs in descrecent order", async () => {
      // Arrange
      const { repository } = await makeTestTodoRepository();

      // Act
      await insertTestTodos();
      const result = await repository.findAll();

      //Assert
      expect(result[0].createdAt).toBe("date 4");
      expect(result[1].createdAt).toBe("date 3");
      expect(result[2].createdAt).toBe("date 2");
      expect(result[3].createdAt).toBe("date 1");
      expect(result[4].createdAt).toBe("date 0");
    });
  });

  describe("create", () => {
    it("create a todo if all data is valid", async () => {
      // Arrange
      const { repository, todos } = await makeTestTodoRepository();

      // Act
      const newTodo = await repository.create(todos[0]);

      //Assert
      expect(newTodo).toStrictEqual({ success: true, todo: todos[0] });
    });

    it("fail if there is a equal description in table", async () => {
      // Arrange
      const { repository, todos } = await makeTestTodoRepository();

      // Act
      await repository.create(todos[0]);

      const anotherTodo = {
        id: "any-id",
        description: todos[0].description,
        createdAt: "any date",
      };

      const result = await repository.create(anotherTodo);

      //Assert
      expect(result).toStrictEqual({
        success: false,
        errors: ["A todo with the submitted ID or description already exists"],
      });
    });

    it("fail if there is a equal id in table", async () => {
      // Arrange
      const { repository, todos } = await makeTestTodoRepository();

      // Act
      await repository.create(todos[0]);

      const anotherTodo = {
        id: todos[0].id,
        description: "any descrption",
        createdAt: "any date",
      };

      const result = await repository.create(anotherTodo);

      //Assert
      expect(result).toStrictEqual({
        success: false,
        errors: ["A todo with the submitted ID or description already exists"],
      });
    });
  });

  describe("remove", () => {
    it("remove a todo if its exist", async () => {
      // Arrange
      const { repository, todos } = await makeTestTodoRepository();

      // Act
      const result = await repository.remove(todos[0].id);

      //Assert
      expect(result).toStrictEqual({ success: true, todo: todos[0] });
    });

    it("fail if there is not a todo in table", async () => {
      // Arrange
      const { repository, todos } = await makeTestTodoRepository();

      // Act
      const result = await repository.remove("id 8");

      //Assert
      expect(result).toStrictEqual({
        success: false,
        errors: ["Todo does not exist"],
      });
    });
  });
});
