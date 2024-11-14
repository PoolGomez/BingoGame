
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface AnimatedRecentNumbersProps {
  numbers: number[];
}

export const AnimatedRecentNumbers: React.FC<AnimatedRecentNumbersProps> = ({ numbers }) => {
  return (
    
      <AnimatePresence>
        {numbers.map((num) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="w-[5rem] h-[5rem] flex items-center justify-center rounded-full bg-secondary text-primary font-bold text-6xl"
          >
            {num}
          </motion.div>
        ))}
      </AnimatePresence>
  );
};
