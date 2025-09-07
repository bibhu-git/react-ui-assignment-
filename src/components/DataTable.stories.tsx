
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, Column } from "./DataTable";

type User = { id: number; name: string; email: string; age: number };

const data: User[] = [
  { id: 1, name: "Bibhu", email: "bibhu@gmail.com", age: 21 },
  { id: 2, name: "Bapi", email: "bapi@gmail.com", age: 22 }
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true }
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable
};
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = { args: { data, columns, selectable: true } };
export const Loading: Story = { args: { data: [], columns, loading: true } };
export const Empty: Story = { args: { data: [], columns } };
