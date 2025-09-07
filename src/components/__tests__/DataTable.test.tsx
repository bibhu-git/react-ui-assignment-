
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataTable, Column } from "../../components/DataTable";

type Row = { id: number; name: string; age: number };

const rows: Row[] = [
  { id: 1, name: "Bob", age: 24 },
  { id: 2, name: "Alice", age: 30 }
];

const cols: Column<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true }
];

test("renders table and sorts", () => {
  render(<DataTable data={rows} columns={cols} />);
  const header = screen.getByText("Name");
  fireEvent.click(header);
  const firstRow = screen.getAllByRole("row")[1];
  expect(within(firstRow).getByText("Alice")).toBeInTheDocument();
});

test("selects rows when selectable", () => {
  const spy = vi.fn();
  render(<DataTable data={rows} columns={cols} selectable onRowSelect={spy} />);
  const checkbox = screen.getAllByRole("checkbox")[0];
  fireEvent.click(checkbox);
  expect(spy).toHaveBeenCalled();
});
