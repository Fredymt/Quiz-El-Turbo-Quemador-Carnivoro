
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Check, Circle } from 'lucide-react';
import { MeatType } from '../types';

interface MeatPreferenceScreenProps {
  onNext: (selectedMeats: MeatType[]) => void;
}

export const MeatPreferenceScreen: React.FC<MeatPreferenceScreenProps> = ({ onNext }) => {
  const [selectedMeats, setSelectedMeats] = useState<MeatType[]>([]);

  const options: { id: MeatType; label: string; icon: string }[] = [
    { id: 'all', label: 'Yo como todas las carnes', icon: '🍽️' },
    { id: 'poultry', label: 'Aves de corral', icon: '🍗' },
    { id: 'pork', label: 'Cerdo', icon: '🥓' },
    { id: 'beef', label: 'Carne de res', icon: '🥩' },
    { id: 'lamb', label: 'Cordero', icon: '🍖' },
    { id: 'veal', label: 'Ternera', icon: '🐮' },
  ];

  const toggleOption = (id: MeatType) => {
    if (id === 'all') {
      // Logic: If "All" is selected, clear everything else and select "All"
      // If "All" was already selected, deselect it (empty list)
      if (selectedMeats.includes('all')) {
        setSelectedMeats([]);
      } else {
        setSelectedMeats(['all']);
      }
    } else {
      // Logic: If specific meat is selected
      let newSelection = [...selectedMeats];
      
      // If "All" was selected, remove it because we are now customizing
      if (newSelection.includes('all')) {
        newSelection = newSelection.filter(m => m !== 'all');
      }

      if (newSelection.includes(id)) {
        newSelection = newSelection.filter(m => m !== id);
      } else {
        newSelection.push(id);
      }
      setSelectedMeats(newSelection);
    }
  };

  const handleNext = () => {
    if (selectedMeats.length > 0) {
      onNext(selectedMeats);
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col items-center animate-fade-in">
      {/* 2. Título Principal */}
      <div className="text-center mb-2 mt-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black leading-tight">
          Selecciona las carnes que TE GUSTAN
        </h2>
      </div>

      {/* 3. Subtexto */}
      <div className="text-center mb-8 px-6">
        <p className="text-brand-gray text-lg font-medium">
          Selecciona las carnes que quieres incluir en tu plan del Turbo-Quemador Carnívoro.
        </p>
      </div>

      {/* 4. Opciones (Checkbox) */}
      <div className="w-full flex flex-col gap-3 mb-8">
        {options.map((option) => {
          const isSelected = selectedMeats.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`
                w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected 
                  ? 'bg-white border-brand-red shadow-md' 
                  : 'bg-[#F9F9F9] border-transparent hover:bg-gray-100'}
              `}
            >
              <div className="flex items-center gap-4">
                {/* Icono Circular */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-2xl
                  ${isSelected ? 'bg-brand-soft' : 'bg-white shadow-sm'}
                `}>
                  {option.icon}
                </div>
                {/* Texto */}
                <span className={`text-lg font-medium ${isSelected ? 'text-brand-black' : 'text-gray-600'}`}>
                  {option.label}
                </span>
              </div>

              {/* Checkbox */}
              <div className={`
                w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors
                ${isSelected 
                  ? 'bg-brand-red border-brand-red' 
                  : 'bg-white border-gray-300'}
              `}>
                {isSelected && <Check size={16} className="text-white" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* 5. Botón Inferior */}
      <div className="w-full flex justify-center">
        <Button 
          onClick={handleNext}
          className={`
            w-full md:w-auto px-16 py-4 text-xl shadow-lg transition-opacity
            ${selectedMeats.length === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
          `}
          disabled={selectedMeats.length === 0}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
