
import React, { useId, useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  clearable?: boolean;
  type?: "text" | "password" | "email";
  className?: string;
}

const sizeCls = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-base"
};

const variantCls = {
  filled: "bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:bg-white dark:focus:bg-neutral-900",
  outlined: "bg-white dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700",
  ghost: "bg-transparent border-b border-neutral-400 dark:border-neutral-700 rounded-none"
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  loading = false,
  clearable = false,
  type = "text",
  className
}) => {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`w-full ${className ?? ""}`}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          aria-invalid={invalid || undefined}
          aria-busy={loading || undefined}
          aria-describedby={helperText || errorMessage ? `${id}-desc` : undefined}
          type={isPassword && !show ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={[
            "w-full rounded-md outline-none focus:ring-2 transition-shadow",
            sizeCls[size],
            variantCls[variant],
            invalid ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300",
            disabled || loading ? "opacity-70 cursor-not-allowed" : ""
          ].join(" ")}
        />

        {loading && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">…</span>}

        {isPassword && (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-600 dark:text-neutral-300"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}

        {!isPassword && clearable && value && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={() => onChange && onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-600 dark:text-neutral-300"
          >
            ✕
          </button>
        )}
      </div>

      <div id={`${id}-desc`} className="mt-1 text-xs">
        {invalid && errorMessage ? (
          <span className="text-red-600">{errorMessage}</span>
        ) : (
          helperText && <span className="text-neutral-500 dark:text-neutral-400">{helperText}</span>
        )}
      </div>
    </div>
  );
};
