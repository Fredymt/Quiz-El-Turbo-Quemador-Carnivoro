
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';

interface PersonalPlanScreenProps {
  targetWeight: number; // in kg
  onNext: (email: string) => void;
}

export const PersonalPlanScreen: React.FC<PersonalPlanScreenProps> = ({ targetWeight, onNext }) => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      onNext(email);
    } else {
      alert('Por favor ingresa un email válido');
    }
  };

  const benefits = [
    { icon: '📋', text: 'Plan de comidas paso a paso' },
    { icon: '🛒', text: 'Lista de compras personalizada' },
    { icon: '📱', text: 'Acceso a la app móvil' },
    { icon: '😋', text: 'Eliminación de antojos desde la primera semana' },
    { icon: '📅', text: 'Resultados visibles en 14 días' },
  ];

  // Round target weight for cleaner display
  const displayWeight = Math.round(targetWeight);

  return (
    <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
      {/* 1. Título Principal */}
      <div className="text-center mb-6 mt-2 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black leading-tight">
          Tu plan personal está listo.
        </h2>
      </div>

      {/* 2. Subtítulo con peso dinámico */}
      <div className="text-center mb-10 px-4 md:px-12">
        <p className="text-brand-gray text-lg md:text-xl font-normal leading-relaxed">
          Ingresa tu email para recibir tu guía personalizada para llegar a <span className="font-bold text-brand-black">{displayWeight} kg</span> con el método Turbo-Quemador Carnívoro.
        </p>
      </div>

      {/* 3. Bullets de Beneficios */}
      <div className="w-full max-w-md flex flex-col gap-4 mb-10 pl-2">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-4">
            <span className="text-2xl flex-shrink-0 mt-1">{benefit.icon}</span>
            <span className="text-brand-black text-lg font-medium leading-snug">
              {benefit.text}
            </span>
          </div>
        ))}
      </div>

      {/* 4. Campo de Email */}
      <div className="w-full max-w-md mb-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu email para obtener tu plan"
          className="w-full bg-[#F5F5F5] border border-gray-200 rounded-xl py-5 px-6 text-lg text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all placeholder-gray-400"
        />
      </div>

      {/* 5. Checkbox de Privacidad */}
      <div className="w-full max-w-md flex items-start gap-3 mb-8 px-2">
        <button
          onClick={() => setAgreed(!agreed)}
          className={`
            flex-shrink-0 w-6 h-6 rounded border transition-colors flex items-center justify-center mt-1
            ${agreed ? 'bg-brand-red border-brand-red' : 'bg-white border-gray-300'}
          `}
        >
          {agreed && <Check size={16} className="text-white" strokeWidth={3} />}
        </button>
        <p className="text-sm text-gray-500 leading-snug cursor-pointer" onClick={() => setAgreed(!agreed)}>
          Estoy de acuerdo con la Política de privacidad y recibir información futura
        </p>
      </div>

      {/* 6. Botón Principal */}
      <div className="w-full flex justify-center mb-8">
        <Button 
          onClick={handleSubmit}
          className="w-full max-w-md px-12 py-5 text-xl shadow-lg"
        >
          Ver mi plan &rarr;
        </Button>
      </div>

      {/* 7. Texto de Privacidad */}
      <div className="w-full max-w-lg text-center px-4">
        <p className="text-xs text-gray-400 leading-relaxed">
          Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Te enviaremos una copia de tus resultados por correo electrónico para que puedas acceder a ellos fácilmente.
        </p>
      </div>
    </div>
  );
};
