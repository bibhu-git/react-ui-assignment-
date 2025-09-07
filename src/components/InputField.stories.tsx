
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState("");
    return <InputField label="Name" placeholder="Enter your name" value={v} onChange={(e) => setV(e.target.value)} helperText="Helper text" />;
  }
};

export const Error: Story = {
  args: { label: "Email", placeholder: "Enter email", invalid: true, errorMessage: "Invalid email" }
};

export const Password: Story = {
  args: { label: "Password", placeholder: "Enter password", type: "password" }
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Filled" variant="filled" placeholder="Text" />
      <InputField label="Outlined" variant="outlined" placeholder="Text" />
      <InputField label="Ghost" variant="ghost" placeholder="Text" />
    </div>
  )
};
