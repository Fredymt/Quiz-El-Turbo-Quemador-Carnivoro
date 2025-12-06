import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  progress: number;
  showBackArrow?: boolean;
  onBack?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  progress, 
  showBackArrow = false, 
  onBack 
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* 1. Encabezado minimalista */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="relative flex items-center justify-center h-20 px-4">
          {showBackArrow && (
            <button 
              onClick={onBack}
              className="absolute left-4 md:left-8 bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Volver"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {/* Logo centrado */}
          <div className="flex items-center justify-center h-14">
             <img 
              src="https://i.imgur.com/Omo9Crv.png" 
              alt="Turbo-Quemador Carnívoro" 
              className="h-full w-auto object-contain"
            />
          </div>
        </div>

        {/* Barra de progreso delgada */}
        <div className="h-1 w-full bg-brand-light">
          <div 
            className="h-full bg-brand-red transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Contenido principal centrado */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 mt-20 pb-12 w-full max-w-3xl mx-auto">
        {children}
      </main>
    </div>
  );
};