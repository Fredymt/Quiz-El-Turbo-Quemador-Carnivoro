import React from 'react';

interface ImageOptionProps {
  label: string;
  imageSrc: string;
  onClick: () => void;
  className?: string;
}

export const ImageOption: React.FC<ImageOptionProps> = ({ label, imageSrc, onClick, className = '' }) => {
  return (
    <div 
      onClick={onClick} 
      className={`
        cursor-pointer group flex flex-col items-center gap-4
        transition-transform duration-200 active:scale-95
        ${className}
      `}
    >
      {/* Container Circular de Imagen */}
      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-brand-soft overflow-hidden shadow-md group-hover:shadow-xl group-hover:ring-4 group-hover:ring-brand-soft transition-all border-4 border-white">
         <img 
          src={imageSrc} 
          alt={label} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
        />
      </div>
      
      {/* Etiqueta Roja */}
      <div className="bg-brand-red text-white text-base font-bold py-1.5 px-6 rounded-lg shadow-sm min-w-[80px] text-center">
        {label}
      </div>
    </div>
  );
};