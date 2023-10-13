import * as React from "react";
import { iconLibrary } from "./iconLibrary";
import clsx from "clsx";

type IconName = keyof typeof iconLibrary;

type Props = {
  name: IconName;
  classname?: React.CSSProperties;
};
export const Icon = ({ name, classname }: Props) => {
  const renderedPaths = iconLibrary[name]?.paths.map(
    (path: string, index: number) => <path key={index} d={path}></path>
  );

  const viewBox = iconLibrary[name]?.viewBox;

  return (
    <svg viewBox={viewBox} className={clsx("h-16 w-16 fill-white", classname)}>
      {renderedPaths}
    </svg>
  );
};
