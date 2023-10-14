import React, { ComponentProps } from "react";
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
        "bg-[#3b71ca]": variant === "primary",
        "border border-[#3b71ca] text-[#3b71ca]": variant === "secondary",
      })}
    >
      {children}
    </button>
  );
}
