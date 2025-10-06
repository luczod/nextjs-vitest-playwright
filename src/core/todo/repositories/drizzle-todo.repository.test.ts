import { drizzleDatabase } from "@/db";
import { DrizzleTodoRepository } from "./drizzle-todo.repository";

describe("DrizzleTodoRepository (Integration)", () => {
  describe("findAll", () => {
    it("should return a empty array if table is clean", async () => {
      const repository = new DrizzleTodoRepository(drizzleDatabase.db);
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });
    it("should return all TODOs in descrecent order", async () => {});
  });

  describe("create", () => {
    it("create a todo if all data is valid", async () => {});
    it("fail if there is a equal description in table", async () => {});
    it("fail if there is a equal id in table", async () => {});
  });

  describe("remove", () => {
    it("remove a todo if its exist", async () => {});
    it("should return all TODOs in descrecent order", async () => {});
  });
});
