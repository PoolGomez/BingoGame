"use client"
import React, { useEffect, useState } from 'react'

import { NumberDisplay } from './NumberDisplay';
import { PreviousNumbers } from './PreviousNumbers';
import { BingoBoard } from './BingoBoard';
import { AnimatedNumberInvisible } from './AnimatedNumberInvisible/AnimatedNumberInvisible';
import { FirebaseNumberBingoRepository } from '@/src/infrastructure/repositories/FirebaseNumberBingoRepository';
import { SubscribeToNumbersUseCase } from '@/src/application/usecases/SubscribeToNumbersUseCase';
import { NumberBingo } from '@/src/domain/entities/NumberBingo';


export function BingoMonitor() {

    const [numbers, setNumbers] = useState<NumberBingo[]>([]);
  const [recent, setRecent] = useState<number | null>(null);

  useEffect(()=>{
    const numbersRepository = new FirebaseNumberBingoRepository();
    const subscribeToNumbersUseCase = new SubscribeToNumbersUseCase(numbersRepository);

    const unsubscribe = subscribeToNumbersUseCase.execute((numbersList)=>{
      play();
      setNumbers(numbersList);
      setRecent(numbersList[0]?.number || null);
    })
    return () => unsubscribe();

  },[])

  

  const play = () =>{
    
    const audio = new Audio("/audio/draw.mp3");
      audio.play().catch(() => {});

  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      <div className="hidden p-0 flex-col lg:block h-screen border-0">
        
        <NumberDisplay
          currentNumber={recent} 
          isGameComplete={false}
        />
        <PreviousNumbers numbers={numbers} />
      </div>

      <div className="p-0 flex items-center justify-center h-screen">
        
          <div className='absolute items-center justify-center text-center lg:hidden'>
            
            <AnimatedNumberInvisible number={recent} />
          </div>
        
        <BingoBoard drawnNumbers={numbers} />
      </div>
    </div> 

  )
}

