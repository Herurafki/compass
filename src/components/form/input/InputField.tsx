"use client";

import dynamic from 'next/dynamic';
import React, { FC, useEffect, useState } from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  value?: string | number;
  hint?: string;
  readOnly?: boolean;
}

// Dynamic import dengan disabled SSR untuk menghindari hydration issues
const DynamicInput: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  defaultValue,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  value,
  readOnly = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number>(value ?? defaultValue ?? "");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  // Dynamic class computation
  const getInputClasses = () => {
    let classes = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

    if (disabled) {
      classes += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
      classes += ` text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
    } else if (success) {
      classes += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500`;
    } else {
      classes += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }

    return classes;
  };

  if (!isMounted && typeof window === 'undefined') {
    // Render placeholder selama SSR
    return (
      <div className="relative">
        <div className={`h-11 w-full rounded-lg border ${className}`} />
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={getInputClasses()}
        readOnly={readOnly}
        suppressHydrationWarning={type === "date" || type === "time"}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

// Export dynamic component dengan disabled SSR
const Input = dynamic(() => Promise.resolve(DynamicInput), {
  ssr: false,

  loading: () => (
    <div className="relative">
      <div className="h-11 w-full rounded-lg border bg-gray-100 dark:bg-gray-800" />
    </div>
  )
});

export default Input;