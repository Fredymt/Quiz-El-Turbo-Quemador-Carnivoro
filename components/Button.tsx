import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, fullWidth = false, className = '', ...props }) => {
  return (
    <button
      className={`
        bg-brand-red text-white font-bold text-lg
        py-4 px-8 rounded-xl shadow-md transition-transform active:scale-[0.98]
        hover:bg-[#700000]
        ${fullWidth ? 'w-full' : 'w-auto min-w-[200px] max-w-md'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};