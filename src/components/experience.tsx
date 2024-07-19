import React, { useState, useEffect } from 'react';

interface ExperienceProps {
  text: string;
  num: number;
  i: number;
  isVisible: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ text, num, i, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // Duración de la animación en milisegundos
      const steps = 60; // Número de pasos para la animación
      const increment = num / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
          clearInterval(timer);
          setCount(num);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, num]);

  return (
    <div className={`flex flex-col items-center ${i !== 0 ? 'ml-[112px]' : ''}`}>
      <h1 className="font-dm text-[60px] leading-[65px] text-primary-500">
      {count}
      </h1>
      <p className="font-jost text-[1.5Arem] text-primary-600 w-[93px] text-center">
        {text}
      </p>
    </div>
  );
};