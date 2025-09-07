
import React, { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable, Column } from "./components/DataTable";

type User = { id: number; name: string; email: string; age: number };

export default function App() {
  const [name, setName] = useState("");
  const [dark, setDark] = useState(false);

  const users: User[] = [
    { id: 1, name: "Bibhu", email: "bibhu@gmail.com", age: 21 },
    { id: 2, name: "Dina Krushna", email: "dinakrushna@gmail.com", age: 22 },
    { id: 3, name: "Raja", email: "raja@gmail.com", age: 21 }
  ];

  const columns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "age", title: "Age", dataIndex: "age", sortable: true }
  ];

  const invalid = name.trim().length > 0 && name.trim().length < 3;

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-6 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">UI Components Demo</h1>
          <button
            onClick={() => setDark(v => !v)}
            className="rounded-xl border px-3 py-2"
            aria-pressed={dark}
          >
            {dark ? "Light" : "Dark"} mode
          </button>
        </header>

        <section className="max-w-md space-y-4">
          <InputField
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText="At least 3 characters"
            errorMessage="Too short"
            invalid={invalid}
            variant="filled"
            size="md"
            clearable
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            size="md"
          />

          <InputField
            label="Disabled"
            placeholder="You can't type here"
            disabled
            variant="ghost"
            size="sm"
          />
        </section>

        <section>
          <DataTable<User>
            data={users}
            columns={columns}
            selectable
            onRowSelect={(rows) => console.log("Selected rows:", rows)}
          />
        </section>
      </div>
    </div>
  );
}
