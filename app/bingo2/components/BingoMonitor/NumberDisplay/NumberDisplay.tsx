"use client";

// import { Card } from "@/components/ui/card";W
import { useEffect, useState } from "react";

interface NumberDisplayProps {
  currentNumber: number | null;
  isGameComplete: boolean;
}

// const getBorderColor = (number: number) => {
//   if (number >= 1 && number <= 15) return 'border-blue-500';
//   if (number >= 16 && number <= 30) return 'border-red-500';
//   if (number >= 31 && number <= 45) return 'border-yellow-500';
//   if (number >= 46 && number <= 60) return 'border-green-500';
//   if (number >= 61 && number <= 75) return 'border-orange-500';
//   return 'border-gray-500'; // Color por defecto
// };

export function NumberDisplay({
  currentNumber,
  isGameComplete,
}: NumberDisplayProps) {
  const[number ,setNumber] = useState<number | null>(null);

  useEffect(()=>{
    setNumber(currentNumber)
  },[currentNumber])

  return (
    <div className="flex items-center justify-center w-full h-full">

    
    <div 
    // className="relative w-full h-full"
    className="relative w-56 h-56"
    >
      {currentNumber ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <div className={`bingo-ball animate-roll`}> */}
          <div className={`bingo-ball red animate-roll `}>
            <div className="ball-content">
              <span className="ball-number">{number}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <div className="bingo-ball empty-ball"> */}
          <div className={`bingo-ball animate-roll-infinite`}>
            <div className="ball-content">
              <span className="ball-number text-3xl"></span>
            </div>
          </div>
        </div>
      )}
    </div>


    </div>
  );
}

// ORIGINAL
{/* <Card className="p-2 text-center text-foreground h-full">
      {isGameComplete ? (
        <div
          key="complete"
          className="flex flex-col items-center justify-center min-h-[240px] "
        >
          <Trophy className="w-24 h-24 mb-4" />
          <h2 className="text-4xl font-bold">Game Complete!</h2>
        </div>
      ) : (
        <AnimatedCurrentNumber number={currentNumber} />
      )}
    </Card> */}