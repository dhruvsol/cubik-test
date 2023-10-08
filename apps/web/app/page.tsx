import React from "react";
import AssetList from "../components/asset-list";
import { Button } from "ui-components";

function Gradient({
  className,
  conic,
  small,
}: {
  className?: string;
  conic?: boolean;
  small?: boolean;
}): JSX.Element {
  const baseClasses = "absolute mix-blend-normal";
  const conicClass = conic ? "bg-[var(--glow-conic)]" : "";
  const sizeClass = small ? "blur-[32px]" : "blur-[75px]";
  return <span className={`${baseClasses} ${sizeClass} ${conicClass} ${className}`} />;
}

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between p-24 min-h-screen">
      <div className="flex space-x-4">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </div>
      <div className="relative flex items-center">
        <Gradient className="top-[-500px] w-[1000px] h-[1000px] opacity-15" conic />
      </div>
      <div className="grid grid-cols-1 gap-4 w-full">
        <AssetList />
      </div> 
    </main>
  );
}

