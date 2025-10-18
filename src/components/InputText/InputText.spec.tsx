import { render, screen } from "@testing-library/react";
import { InputText, InputTextProps } from ".";
import userEvent from "@testing-library/user-event";

type Props = Partial<InputTextProps>;

const makeInput = (p: Props = {}) => {
  return (
    <InputText
      labelText="label"
      placeholder="placeholder"
      type="text"
      disabled={false}
      required={true}
      readOnly={false}
      {...p}
    />
  );
};

const renderInput = (p?: Props) => {
  const renderResult = render(makeInput(p));
  const input = screen.getByRole("textbox");
  return { input, renderResult };
};

const inputElem = (p?: Props) => renderInput(p).input;

describe("<InputText />", () => {
  describe("default behavior", () => {
    it("render with label", async () => {
      // ARRANGE
      const el = inputElem({ labelText: "new label" });

      // ACT
      const label = screen.getByText("new label");

      // ASSERT
      expect(el).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it("render with placeholder", async () => {
      // ARRANGE AND ACT
      const el = inputElem({ placeholder: "new placeholder" });

      // ASSERT
      expect(el).toHaveAttribute("placeholder", "new placeholder");
    });

    it("render without placeholder", async () => {
      // ARRANGE AND ACT
      const el = inputElem({ placeholder: undefined });

      // ASSERT
      expect(el).not.toHaveAttribute("placeholder");
    });

    it("render without label", async () => {
      // ARRANGE
      inputElem({ labelText: undefined });

      // ACT
      const label = screen.queryByRole("novo label");

      // ASSERT
      expect(label).not.toBeInTheDocument();
    });

    it("use labelText as aria-label when possible", async () => {
      // ASSERT
      expect(inputElem()).toHaveAttribute("aria-label", "label");
    });

    it("use placeholder as aria-label fallback", async () => {
      // ASSERT
      expect(inputElem({ labelText: undefined })).toHaveAttribute(
        "aria-label",
        "placeholder"
      );
    });

    it("displays the default value correctly", async () => {
      // ASSERT
      expect(inputElem({ defaultValue: "valor" })).toHaveValue("valor");
    });

    it("accepts other JSX props (name, maxLength)", async () => {
      // ARRANGE AND ACT
      const el = inputElem({ name: "input name", maxLength: 10 });

      // ASSERT
      expect(el).toHaveAttribute("name", "input name");
      expect(el).toHaveAttribute("maxLength", "10");
    });
  });

  describe("accessibility", () => {
    it("does not display error message by default", async () => {
      // ARRANGE AND ACT
      const el = inputElem();

      // ASSERT
      expect(el).toHaveAttribute("aria-invalid", "false");
      expect(el).not.toHaveAttribute("aria-describedby");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("does not mark the input as invalid by default", async () => {
      // ARRANGE AND ACT
      const el = inputElem();

      // ASSERT
      expect(el).toHaveAttribute("aria-invalid", "false");
    });

    it("renders error message when `errorMessage` is passed", async () => {
      // ARRANGE AND ACT
      const el = inputElem({ errorMessage: "have a error" });
      const error = screen.getByRole("alert");
      const errorId = error.getAttribute("id");

      // ASSERT
      expect(el).toHaveAttribute("aria-invalid", "true");
      expect(el).toHaveAttribute("aria-describedby", errorId);
      expect(error).toBeInTheDocument();
    });
  });

  describe("interactive behavior", () => {
    it("updates the value as the user types", async () => {
      // ARRANGE
      const user = userEvent.setup();
      const el = inputElem();

      // ACT
      await user.type(el, "some text");

      // ASSERT
      expect(el).toHaveValue("some text");
    });
  });

  describe("visual states", () => {
    it("applies visual classes when disabled", async () => {
      // ARRANGE AND ACT
      const el = inputElem({ disabled: true });

      // ASSERT
      expect(el).toHaveClass("disabled:bg-slate-200 disabled:text-slate-400");
    });

    it("applies visual classes when readonly", async () => {
      // ARRANGE AND ACT
      const el = inputElem({ readOnly: true });

      // ASSERT
      expect(el).toHaveClass("read-only:bg-slate-100");
    });

    it("adds error class (red ring) when invalid", async () => {
      // ARRANGE AND ACT
      const el = inputElem({ errorMessage: "Error" });

      // ASSERT
      expect(el).toHaveClass("ring-red-500 focus:ring-red-700");
    });

    it("accepts custom classes from the developer", async () => {
      // ARRANGE AND ACT
      const el = inputElem({ className: "custom" });
      // ASSERT
      expect(el).toHaveClass("custom");
    });
  });
});
