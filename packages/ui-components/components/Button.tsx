import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children }) => {
  const baseClasses = "py-2 px-4 rounded";
  const primaryClasses = "bg-blue-500 text-white hover:bg-blue-600";
  const secondaryClasses = "bg-gray-300 text-black hover:bg-gray-400";

  const finalClasses = `
    ${baseClasses} 
    ${variant === 'primary' ? primaryClasses : secondaryClasses}
  `;

  return <button className={finalClasses}>{children}</button>;
};
