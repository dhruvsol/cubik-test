import React from 'react';

interface GradientProps {
  className?: string;
  conic?: boolean;
  small?: boolean;
  large?: boolean;
}

function BackgroundGradient({ className = '', conic, radial, small, large }: GradientProps): JSX.Element {
  const baseStyles = {
    mixBlendMode: 'normal',
    willChange: 'filter'
  };

  const conicGradient = conic ? { backgroundImage: 'var(--glow-conic)' } : {};
  
  const radialGradient = radial ? { backgroundImage: 'var(--glow-radial)' } : {};

  const blurSmall = small ? { filter: 'blur(32px)' } : {};

  const blurLarge = large ? { filter: 'blur(75px)' } : {};

  const defaultSize = {
    top: '-500px',
    width: '1000px',
    height: '1000px',
    opacity: 0.2
  };

  const combinedStyles = { ...baseStyles, ...conicGradient, ...radialGradient, ...blurSmall, ...blurLarge, ...defaultSize };

  return <span style={combinedStyles} className={className} />;
}

export default BackgroundGradient;
