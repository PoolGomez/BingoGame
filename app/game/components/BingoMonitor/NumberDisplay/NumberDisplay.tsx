"use client";
import { numeroAletraBingo } from "@/lib/utils";
import { useEffect, useState } from "react";

interface NumberDisplayProps {
  currentNumber: number | null;
}

export function NumberDisplay({
  currentNumber
}: NumberDisplayProps) {
  const[number ,setNumber] = useState<number | null>(null);

  useEffect(()=>{
    setNumber(currentNumber)
  },[currentNumber])

  return (
    <div className="flex items-center justify-center w-full h-full">

    <div className="relative w-[20rem] h-[20rem]">
      { currentNumber  ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`bingo-ball red animate-roll `}>
            <div className="ball-content">
              <span className="ball-letter">{numeroAletraBingo(number)}</span>
              {/* <span className={`${roboto_mono.variable}`}>{numeroAletraBingo(number)}</span> */}
              <span className="ball-number">{number}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
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

