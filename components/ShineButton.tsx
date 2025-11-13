import React from 'react';

interface ShineButtonProps {
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const ShineButton: React.FC<ShineButtonProps> = ({ href, type = 'button', children, onClick }) => {
  const commonClasses = "group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-black rounded-md";

  const content = (
    <>
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      <span className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 border-l-2 border-white/50 group-hover:w-full"></span>
      <span className="absolute bottom-0 right-0 w-0 h-full transition-all duration-300 border-r-2 border-white/50 group-hover:w-full"></span>
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={commonClasses} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={commonClasses} onClick={onClick}>
      {content}
    </button>
  );
};

export default ShineButton;