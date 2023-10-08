import React from "react";
import { Button } from "ui-components";
import AssetList from "./components/asset-list";
import BackgroundGradient from './components/background-gradient';

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between p-24 min-h-screen">
      <div className="flex space-x-4">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </div>
      <div className="relative flex items-center">
        <BackgroundGradient className="top-[-500px] w-[1000px] h-[1000px] opacity-15" conic /> 
      </div>
      <div className="grid grid-cols-1 gap-4 w-full">
        <AssetList />
      </div> 
    </main>
  );
}