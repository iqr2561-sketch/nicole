
import React from 'react';

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string[];
}

const ShineBorder: React.FC<ShineBorderProps> = ({
  children,
  className = '',
  color = ['#707070', '#333333', '#707070'],
}) => {
  const gradientStyle = {
    '--gradient-color-1': color[0],
    '--gradient-color-2': color[1],
    '--gradient-color-3': color[2],
  };

  return (
    <div
      style={gradientStyle as React.CSSProperties}
      className={`p-[1px] bg-gradient-to-br from-[var(--gradient-color-1)] via-[var(--gradient-color-2)] to-[var(--gradient-color-3)] rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default ShineBorder;
