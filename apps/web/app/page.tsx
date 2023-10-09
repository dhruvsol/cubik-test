import React from "react";
import { Button } from "ui-components";
import AssetList from "./components/asset-list";
import BackgroundGradient from './components/background-gradient';

export default function Page(): JSX.Element {
  return (
    <div className="relative flex flex-col items-center justify-between p-24 min-h-screen bg-black">
      <BackgroundGradient className="absolute top-0 left-0 w-full h-full opacity-30" conic large />
      
      <div className="flex space-x-4 z-10">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 w-full z-10">
        <AssetList />
      </div> 
    </div>
  );
}
