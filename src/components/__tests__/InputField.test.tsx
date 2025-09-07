
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputField } from "../../components/InputField";

test("renders label and helper", () => {
  render(<InputField label="Name" helperText="Help" />);
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Help")).toBeInTheDocument();
});

test("shows error when invalid", () => {
  render(<InputField label="Email" invalid errorMessage="Invalid" />);
  expect(screen.getByText("Invalid")).toBeInTheDocument();
});

test("clearable input clears value", () => {
  const onChange = vi.fn();
  render(<InputField label="Label" value="abc" onChange={onChange} clearable />);
  fireEvent.click(screen.getByLabelText("Clear input"));
  expect(onChange).toHaveBeenCalled();
});
