import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  required?: boolean;
  errorMessage?: string;
  name?: string;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  errorMessage,
  name,
  rows,
}) => {
  const hasError = !!errorMessage;
  const errorId = name ? `${name}-error` : undefined;
  const isTextarea = rows !== undefined;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm text-gray-500 mb-1 text-left"
      >
        {label}
      </label>

      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`w-full px-0 py-2 bg-transparent border-0 border-b text-gray-900 placeholder-gray-500 focus:outline-none resize-none 
            ${
              hasError
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-gray-600"
            }`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`w-full px-0 py-2 bg-transparent border-0 border-b text-gray-900 placeholder-gray-500 focus:outline-none 
            ${
              hasError
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-gray-600"
            }`}
        />
      )}

      {errorMessage && (
        <p id={errorId} className="text-red-500 text-sm mt-1 text-left">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
