import React from 'react';
import { ChevronRight } from 'lucide-react';

interface OptionButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        bg-brand-light hover:bg-gray-200
        text-brand-black text-lg font-medium
        py-5 px-6 rounded-xl transition-all duration-200
        active:scale-[0.99]
        ${className}
      `}
    >
      <span className="text-left">{label}</span>
      <ChevronRight className="text-gray-400" size={24} />
    </button>
  );
};