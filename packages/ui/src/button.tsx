import React, { Children, ComponentProps } from "react";
import clsx from "clsx";

type buttonProps = ComponentProps<"button">;

export interface Props extends buttonProps {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", children, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx("px-4 py-2 rounded-md text-white", {
        "bg-[#2196f3] ": variant === "primary",
        "bg-[#607d8b]": variant === "secondary",
      })}
    >
      {children}
    </button>
  );
}
