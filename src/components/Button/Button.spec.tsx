// ⚠️ Esse é um teste de implementação consciente:
// Estamos testando se o botão tem as classes certas baseadas em props.
// A Testing Library recomenda evitar esse tipo de teste,
// mas nesse caso, o comportamento *é* visual.
// Logo, esse teste é necessário e justificado.

// OS SELETORES USADOS NESSE TESTE FORAM APENAS COMO EXEMPLO PARA VOCÊ,
// TENTE SEMPRE USAR A ORDEM INDICADA EM ANOTAÇÕES.

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Button } from ".";

const VARIANT_DEFAULT_CLASSES = "bg-blue-600 hover:bg-blue-700 text-blue-100";
const VARIANT_DANGER_CLASSES = "bg-red-600 hover:bg-red-700 text-red-100";
const VARIANT_GHOST_CLASSES = "bg-slate-300 hover:bg-slate-400 text-slate-950";

const SIZE_MD_CLASSES =
  "text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2";
const SIZE_SM_CLASSES =
  "text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1";
const SIZE_LG_CLASSES =
  "text-lg/tight py-4 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3";
const DISABLED_CLASSES =
  "disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed";

describe("<Button />", () => {
  describe("props padrão e JSX", () => {
    it("should render the button with default props (only with children)", async () => {
      // ARRANGE
      render(<Button>submit form</Button>);

      // ACT
      const button = screen.getByRole("button", {
        name: /submit form/i,
      });

      // ASSERT
      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES);
      expect(button).toHaveClass(SIZE_MD_CLASSES);

      // expect(button).toMatchSnapshot();
    });

    it("checks that default JSX properties work correctly", async () => {
      // ARRANGE
      const handlerClick = vi.fn();
      render(
        <Button type="submit" aria-hidden="false" onClick={handlerClick}>
          submit form
        </Button>
      );

      // ACT
      const button = screen.getByText("submit form");
      await userEvent.click(button);
      await userEvent.click(button);

      // ASSERT
      expect(handlerClick).toHaveBeenCalledTimes(2);
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveAttribute("aria-hidden", "false");
    });
  });

  describe("variants (colors)", () => {
    it("check if default applies the correct color", async () => {
      // ARRANGE
      render(
        <Button variant="default" title="btn">
          submit form
        </Button>
      );

      // ACT
      const button = screen.getByTitle(/btn/i);

      // ASSERT
      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES);
    });

    it("check if danger applies the correct color", async () => {
      // ARRANGE
      render(
        <Button variant="danger" title="btn">
          submit form
        </Button>
      );

      // ACT
      const button = screen.getByTitle(/btn/i);

      // ASSERT
      expect(button).toHaveClass(VARIANT_DANGER_CLASSES);
    });

    it("check if ghost applies the correct color", async () => {
      // ARRANGE
      render(
        <Button variant="ghost" title="btn">
          submit form
        </Button>
      );

      // ACT
      const button = screen.getByTitle(/btn/i);

      // ASSERT
      expect(button).toHaveClass(VARIANT_GHOST_CLASSES);
    });
  });

  describe("sizes", () => {
    it("size sm should be smaller", async () => {
      // ARRANGE
      render(
        <Button size="sm" data-testid="any-id" title="btn">
          submit form
        </Button>
      );

      // ACT
      const button = screen.getByTestId("any-id");

      // ASSERT
      expect(button).toHaveClass(SIZE_SM_CLASSES);
    });

    it("size md should be medium", async () => {
      // ARRANGE
      render(
        <Button size="md" data-testid="any-id" title="btn">
          submit form
        </Button>
      );

      // ACT
      const button = screen.getByTestId("any-id");

      // ASSERT
      expect(button).toHaveClass(SIZE_MD_CLASSES);
    });

    it("lg size should be large", async () => {
      // ARRANGE
      render(
        <Button size="lg" data-testid="any-id" title="btn">
          submit form
        </Button>
      );

      // ACT
      const button = screen.getByTestId("any-id");

      // ASSERT
      expect(button).toHaveClass(SIZE_LG_CLASSES);
    });
  });

  describe("disabled", () => {
    it("classes for disabled state are correct", async () => {
      // ARRANGE
      render(<Button disabled>submit form</Button>);

      // ACT
      const button = screen.getByRole("button", { name: /submit form/i });

      // ASSERT
      expect(button).toHaveClass(DISABLED_CLASSES);
      expect(button).toBeDisabled();
    });
  });
});
