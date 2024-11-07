import { motion } from "framer-motion";

export function BingoLettersAnimated({texto}:{texto:string}) {
    // const texto = "BINGO";
    const letters = texto.split("");
  return (
    <div className="flex justify-center items-center space-x-8 text-7xl font-bold">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              animate={{
                y: ["0%", "-30%", "0%"], // Rebote: sube y baja
              }}
              transition={{
                duration: 0.6, // Duración de cada rebote
                repeat: Infinity, // Repetir indefinidamente
                repeatType: "loop", // Tipo de repetición en bucle
                delay: index * 0.1, // Retraso para cada letra en el rebote
                ease: "easeInOut", // Suavizado de la animación
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </div>
  )
}
