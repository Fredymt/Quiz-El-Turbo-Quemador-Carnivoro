
import React, { useEffect, useState } from 'react';

interface ProcessingScreenProps {
  onComplete: () => void;
  duration?: number; // Total duration in ms
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete, duration = 4500 }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Analizando tus datos...",
    "Calculando tu metabolismo actual...",
    "Revisando tu potencial de pérdida de peso..."
  ];

  useEffect(() => {
    // Calculate display time per message roughly
    const intervalTime = duration / messages.length;

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, intervalTime);

    // Complete processing
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, duration, messages.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      {/* Loading Spinner */}
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-light rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-red rounded-full border-t-transparent animate-spin"></div>
      </div>

      {/* Dynamic Text */}
      <div className="h-20 flex items-center justify-center">
        <h2 
          key={currentMessage}
          className="text-2xl md:text-3xl font-bold text-brand-black text-center animate-fade-in px-4"
        >
          {messages[currentMessage]}
        </h2>
      </div>
    </div>
  );
};
