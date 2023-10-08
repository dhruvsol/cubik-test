import React from 'react';

interface GradientProps {
  className?: string;
  conic?: boolean;
  small?: boolean;
}

const BackgroundGradient: React.FC<GradientProps> = ({ className, conic, small }) => {
  const baseClasses = "absolute mix-blend-normal";
  const conicClass = conic ? "bg-[var(--glow-conic)]" : "";
  const sizeClass = small ? "blur-[32px]" : "blur-[75px]";
  
  return <span className={`${baseClasses} ${sizeClass} ${conicClass} ${className}`} />;
};

export default BackgroundGradient;
