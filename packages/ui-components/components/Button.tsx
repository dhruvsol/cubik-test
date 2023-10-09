import React from 'react';
import 'tailwindcss/tailwind.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, onClick }) => {
  const baseClasses = "py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105 border hover:border-gray-500 text-white font-mono text-sm transition-all duration-300 bg-opacity-80 hover:bg-opacity-90";
  const primaryClasses = "bg-transparent hover:bg-gray-900 border-gray-200 hover:border-gray-300";
  const secondaryClasses = "bg-transparent border-gray-700 hover:border-gray-800 text-gray-400 hover:text-white";

  const finalClasses = `
    ${baseClasses} 
    ${variant === 'primary' ? primaryClasses : secondaryClasses}
  `;

  return <button className={finalClasses} onClick={onClick}>{children}</button>;
};

export default Button;
