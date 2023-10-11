"use client";

import React, { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitProps = {
  children: React.ReactNode;
  className: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`btn btn-primary ${className}`}
      type="submit"
      {...props}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
