
import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DerivedStats, Gender } from '../types';

interface BMIResultScreenProps {
  stats: DerivedStats;
  gender: Gender;
  onNext: () => void;
}

export const BMIResultScreen: React.FC<BMIResultScreenProps> = ({ stats, gender, onNext }) => {
  
  // Calculate Gauge Rotation based on BMI (scale 10 to 40 approx)
  // 18.5 is roughly start of normal, 25 start of overweight, 30 obese
  // Map BMI to degrees: 0 to 180
  const getRotation = (bmi: number) => {
    const minBMI = 10;
    const maxBMI = 40;
    const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
    const percentage = (clampedBMI - minBMI) / (maxBMI - minBMI);
    return percentage * 180 - 90; // -90 to +90 degrees for semicircle
  };

  const rotation = getRotation(stats.bmi);

  // Dynamic Copy Logic
  const getGenderCopy = () => {
    if (gender === 'female') {
      return (
        <>
          <p className="mb-4">
            Esto te coloca en la categoría de <strong>{stats.bmiCategory}</strong>, lo cual puede afectar tu energía, metabolismo y capacidad de quemar grasa de manera eficiente.
          </p>
          <p>
            Pero la buena noticia es que el método <strong>Turbo-Quemador Carnívoro</strong> está optimizado especialmente para mujeres en tu situación.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="mb-4">
            Tu IMC indica <strong>{stats.bmiCategory}</strong>, lo que impacta tu rendimiento, energía y metabolismo.
          </p>
          <p>
            Pero el método <strong>Turbo-Quemador Carnívoro</strong> está diseñado para acelerar la quema de grasa en hombres como tú.
          </p>
        </>
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <div className="text-center mb-6 mt-2">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black">
          Tu índice de masa corporal (IMC)
        </h2>
      </div>

      <Card className="w-full max-w-lg bg-[#FFF5F5] border border-brand-soft p-8 relative overflow-hidden">
        {/* Decorative Background Circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-50 z-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-brand-gray text-sm uppercase font-semibold tracking-wider mb-2">
            Índice de masa corporal (IMC)
          </span>
          
          <h3 className="text-3xl md:text-4xl font-extrabold text-brand-red mb-6">
            {stats.bmiCategory}
          </h3>

          {/* Semicircle Gauge */}
          <div className="relative w-48 h-24 mb-6 overflow-hidden">
             {/* Gauge Background */}
            <div className="absolute top-0 left-0 w-full h-48 rounded-full border-[12px] border-gray-200 box-border"></div>
            
            {/* Gauge Color Segments (Simplified visually with gradient or just sections) */}
             <div 
              className="absolute top-0 left-0 w-full h-48 rounded-full border-[12px] border-brand-red box-border"
              style={{ 
                clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)', 
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center',
                transition: 'transform 1s ease-out'
              }}
            ></div>
            
            {/* Needle */}
            <div 
               className="absolute bottom-0 left-1/2 w-1 h-24 bg-brand-black origin-bottom transform -translate-x-1/2"
               style={{ 
                 transform: `translateX(-50%) rotate(${rotation}deg)`,
                 transition: 'transform 1s ease-out'
               }}
            >
               <div className="w-3 h-3 bg-brand-black rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>

          <p className="text-xl text-brand-black font-semibold mb-6">
            Tu IMC actual es: <span className="text-3xl">{stats.bmi}</span>
          </p>

          <div className="text-brand-gray text-lg leading-relaxed text-left md:text-center bg-white/60 p-4 rounded-xl">
             {getGenderCopy()}
          </div>
        </div>
      </Card>

      <div className="mt-8 w-full flex justify-center">
        <Button 
          onClick={onNext}
          className="w-full md:w-auto px-16 py-4 text-xl shadow-lg"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
