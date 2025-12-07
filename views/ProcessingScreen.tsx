
import React, { useEffect, useState } from 'react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Analizando tus datos...",
    "Calculando tu metabolismo actual...",
    "Revisando tu potencial de pérdida de peso..."
  ];

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500); // Change text every 1.5 seconds

    // Complete processing after all messages shown + a small buffer
    const totalTime = messages.length * 1500 + 500;
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, totalTime);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, messages.length]);

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
          className="text-2xl md:text-3xl font-bold text-brand-black text-center animate-fade-in"
        >
          {messages[currentMessage]}
        </h2>
      </div>
    </div>
  );
};
