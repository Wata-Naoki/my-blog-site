import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "sub" | "text";
} & React.ComponentPropsWithoutRef<"button">;

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex min-w-max max-w-max items-center justify-center gap-2 rounded border transition ",
        props.disabled && "opacity-40",
        variant === "primary" &&
          "bg-gray-400 hover:bg-gray-700 text-white border-gray-600",
        variant === "sub" &&
          "text-gray-600 border-gray-600 hover:bg-gray-50 bg-white",
        variant === "text" &&
          "text-gray-600 hover:bg-gray-50 border-none bg-none",
        variant === "text" ? "py-2 px-2" : "py-2 px-4",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
