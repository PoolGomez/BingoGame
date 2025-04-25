"use client"
import { useEffect, useState } from 'react'

import { NumberDisplay } from './NumberDisplay';
import { PreviousNumbers } from './PreviousNumbers';
import { BingoBoard } from './BingoBoard';
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
      setRecent(null)
      setTimeout(() => {
        play();
        setNumbers(numbersList);
        setRecent(numbersList[0].number || null);
      },2500);
      
    })
    return () => unsubscribe();

  },[])

  

  const play = () =>{
    
    const audio = new Audio("/audio/draw.mp3");
      audio.play().catch(() => {});

  }

  return (

    <div className="h-full bg-white p-2">
      <div className="max-w-8xl mx-auto">

        {/* Bingo Board */}
        <div className="rounded-xl px-0 py-0 w-full h-[70%] bg-gray-200" >
          <BingoBoard drawnNumbers={numbers} />
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-[30%] " >
          

          {/* Current Number */}
          <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-2 shadow-2xl flex flex-col items-center">
            <h2 className="text-6xl font-semibold text-black mb-4">NÚMERO ACTUAL</h2>
            <NumberDisplay
              currentNumber={recent}
            />
          </div>

          {/* Last Numbers */}
          <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-6 shadow-2xl hidden lg:block">
            <h2 className="text-6xl font-semibold text-black mb-4 mt-4 text-center">ÚLTIMOS NÚMEROS</h2>
            <PreviousNumbers numbers={numbers} />
            
          </div>
        </div>
      </div>
    </div>


  )
}

{/* <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
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
    </div>  */}
