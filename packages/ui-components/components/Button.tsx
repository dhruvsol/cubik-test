import React from 'react';
import '../styles.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children }) => {
  const baseClasses = "py-2 px-4 rounded border border-gray-300 hover:border-gray-500 text-gray-600 hover:text-black font-mono text-sm transition-all duration-300";
  const primaryClasses = "bg-blue-500 text-white hover:bg-blue-600 border-blue-500 hover:border-blue-600";
  const secondaryClasses = "bg-transparent";

  const finalClasses = `
    ${baseClasses} 
    ${variant === 'primary' ? primaryClasses : secondaryClasses}
  `;

  return <button className={finalClasses}>{children}</button>;
};

export default Button;