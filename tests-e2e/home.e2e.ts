import { test, expect } from "@playwright/test";

test.describe("<Home /> (E2E)", () => {
  // Rendering
  test.describe("Rendering", () => {
    test("It must have the correct HTML title.", async ({ page }) => {
      await page.goto("/");

      await page.waitForTimeout(5000);
    });
  });

  // Creation
  // Exclusion
  // Errors
});
