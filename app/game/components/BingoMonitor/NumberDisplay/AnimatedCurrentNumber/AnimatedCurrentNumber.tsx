import { motion } from "framer-motion";
import React from "react";

interface AnimatedCurrentNumberProps {
  number: number | null;
}

export const AnimatedCurrentNumber: React.FC<AnimatedCurrentNumberProps> = ({
  number,
}) => {
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        yoyo: Infinity, // Efecto de rebote hacia atrás
      },
    },
    hover: {
      scale: 1.1,
      color: "#ff4081", // Cambiar color al pasar el ratón
      transition: {
        duration: 0.3,
      },
    },
  };

  return number ? (
    <motion.div
      animate={{ opacity: [1, 0.5, 1] }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 2, // Duración de cada ciclo de la animación en segundos
        repeat: Infinity, // Repetir indefinidamente
        ease: "easeInOut", // Suavizado de la animación
      }}
      className="flex flex-col items-center justify-center h-full w-full bg-slate-100 text-[6vw] font-bold"
    >
      {number}
    </motion.div>
  ) : (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-50 overflow-hidden">
      <motion.h1
        className="text-6xl font-bold text-black"
        variants={textVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        Esperando...
      </motion.h1>
      <motion.div
        className="absolute w-full h-full bg-slate-50 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};
