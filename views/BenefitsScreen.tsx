
import React from 'react';
import { Button } from '../components/Button';

interface BenefitsScreenProps {
  onNext: () => void;
}

export const BenefitsScreen: React.FC<BenefitsScreenProps> = ({ onNext }) => {
  const benefits = [
    {
      icon: '🩷',
      title: 'Pérdida de peso rápida',
      description: 'El enfoque alto en proteínas y bajo en carbohidratos ayuda a tu cuerpo a usar la grasa como combustible, lo que conduce a una pérdida de peso más rápida desde las primeras semanas.'
    },
    {
      icon: '💛',
      title: 'Inflamación reducida',
      description: 'Al eliminar azúcares y alimentos ultra procesados, muchas personas reportan menos dolor articular, menos hinchazón y menos inflamación crónica.'
    },
    {
      icon: '🤎',
      title: 'Control del antojo',
      description: 'Las comidas ricas en proteínas y grasas saludables te mantienen saciado(a) por más tiempo y reducen los antojos de dulces y snacks.'
    },
    {
      icon: '💗',
      title: 'Equilibrio hormonal',
      description: 'La estabilización del azúcar en sangre y la reducción de inflamación favorecen un mejor equilibrio hormonal, lo que facilita quemar grasa de forma constante.'
    },
    {
      icon: '🩶',
      title: 'Preparación de comidas más sencilla',
      description: 'Menos ingredientes, recetas simples y una estructura clara. Con el Turbo-Quemador Carnívoro sabes exactamente qué comer y cuándo, sin contar calorías.'
    }
  ];

  return (
    <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
      {/* 2. Pregunta Principal */}
      <div className="text-center mb-8 mt-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black leading-tight">
          ¿Cuáles son los beneficios del Turbo-Quemador Carnívoro?
        </h2>
      </div>

      {/* 3. Bloques de Beneficios */}
      <div className="w-full flex flex-col gap-5 mb-10">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="bg-[#F9F9F9] p-6 rounded-xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mt-1 flex-shrink-0">
              {benefit.icon}
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-lg font-bold text-brand-black mb-2">
                {benefit.title}
              </h3>
              <p className="text-brand-gray text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Botón Inferior */}
      <div className="w-full flex justify-center pb-8">
        <Button 
          onClick={onNext}
          className="w-full md:w-auto px-20 py-4 text-xl shadow-lg"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
