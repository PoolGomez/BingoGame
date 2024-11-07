
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedNumberProps {
  number: number | null;
}

export const AnimatedNumberInvisible: React.FC<AnimatedNumberProps> = ({ number }) => {
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    if(number){
        setShowNumber(true)
        // Oculta el número después de 3 segundos
        const timer = setTimeout(() => {
          setShowNumber(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }
    
  }, [number]);

  return (
    <div className="flex justify-center items-center h-screen">
      <AnimatePresence>
        {showNumber && (

            <motion.div
              initial={{ scale: 0, opacity: 0 }} // Empieza invisible y pequeño
              animate={{ scale: 1, opacity: 1 }} // Escala a tamaño completo y aparece
              transition={{
                type: "spring",
                stiffness: 200,  // Rigidez del rebote
                damping: 10,     // Amortiguación para hacer el rebote suave
                duration: 0.5,
              }}
              className="flex items-center justify-center w-[20rem] h-[20rem] rounded-full bg-white shadow-lg"
            >
              <p className="text-black text-[13rem] font-bold">{number}</p>
            </motion.div>
          


        )}

        {!number && (

          <div className="relative  flex items-center justify-center bg-transparent overflow-hidden">

        <motion.div
              animate={{ opacity: [1, 0, 1] }} // Cambia de visible a transparente y vuelve a visible
              transition={{
                duration: 2,  // Duración de cada ciclo de la animación en segundos
                repeat: Infinity,  // Repetir indefinidamente
                ease: "easeInOut",  // Suavizado de la animación
              }}
              className="text-6xl font-bold text-blue-500"
            >
              Esperando...
            </motion.div>
          </div>

        )}
      </AnimatePresence>
    </div>
  );
};
