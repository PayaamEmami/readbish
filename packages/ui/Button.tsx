import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ onClick, children, className }: ButtonProps) => (
  <button onClick={onClick} className={`px-4 py-2 bg-blue-500 text-white rounded ${className ?? ''}`}>
    {children}
  </button>
);

export default Button;