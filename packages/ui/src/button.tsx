import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  variant,
  onClick,
  children,
}: ButtonProps): JSX.Element {
  const distinctClasses = (variantName: ButtonProps["variant"]): string => {
    switch (variantName) {
      case "primary":
        return "ui-bg-white ui-text-black";
      case "secondary":
        return "ui-bg-black ui-text-neutral-200 ui-border ui-border-neutral-400 hover:ui-border-white hover:ui-text-white";
      default:
        return "ui-bg-white ui-text-black";
    }
  };

  return (
    <button
      className={`ui-py-3 ui-px-4 ui-w-full ui-min-w-[120px] ui-rounded ui-font-medium ui-transition-all ui-duration-300 ${distinctClasses(
        variant,
      )}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
