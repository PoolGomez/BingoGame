'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Switch } from '@/components/ui/switch'

const letters = ['B', 'I', 'N', 'G', 'O']

const getRange = (letter: string) => {
  const index = letters.indexOf(letter)
  const start = index * 15 + 1
  return Array.from({ length: 15 }, (_, i) => start + i)
}

export default function BingoStream() {
  const [current, setCurrent] = useState<{ letter: string; number: number }>({ letter: 'G', number: 60 })
  const [history, setHistory] = useState<{ letter: string; number: number }[]>([])
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [interactiveMode, setInteractiveMode] = useState(false)

  const handleNumberClick = (letter: string, number: number) => {
    if (!interactiveMode) return
    if (!selectedNumbers.includes(number)) {
      setCurrent({ letter, number })
      setSelectedNumbers((prev) => [...prev, number])
      setHistory((prev) => [{ letter, number }, ...prev.slice(0, 7)])
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 flex flex-col items-center gap-8 overflow-y-auto">

      <div className="w-full flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Vista interactiva</span>
          <Switch checked={interactiveMode} onCheckedChange={setInteractiveMode} />
        </div>
      </div>

      {/* <h1 className="text-5xl sm:text-6xl font-bold tracking-widest">BINGO</h1> */}

<div className='flex items-center justify-between gap-y-10'>

  {/* Número actual */}
  <div className="text-center w-full">
        <p className="text-lg sm:text-2xl text-gray-400 mb-2">Número actual</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.letter}${current.number}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative font-extrabold bg-yellow-400 text-black rounded-full w-[12rem] h-[12rem] sm:w-[14rem] sm:h-[14rem] md:w-[16rem] md:h-[16rem] flex flex-col items-center justify-center mx-auto shadow-2xl"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-[2rem] sm:text-[2.5rem] md:text-[45em] leading-none">{current.letter}</span>
              <span className="text-[4rem] sm:text-[5rem] md:text-[10rem] leading-none">{current.number}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Últimos números */}
      <div className="text-center w-full">
        <p className="text-lg sm:text-xl text-gray-400 mb-2">Últimos números</p>
        <div className="flex flex-wrap justify-center gap-3">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="bg-white text-black font-bold rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex flex-col items-center justify-center text-sm sm:text-md"
            >
              <span className={`text-xs sm:text-sm md:text-md`}>{item.letter}</span>
              <span className="text-xl sm:text-2xl md:text-3xl leading-none">{item.number}</span>
            </div>
          ))}
        </div>
      </div>


</div>
    

      {/* Tablero completo */}
      <div className="w-full mt-8 px-2">
        <div className="grid grid-cols-5 gap-6 w-full">
          {letters.map((letter) => (
            <div key={letter} className="flex flex-col items-center">
              <div className="text-4xl sm:text-5xl font-bold mb-4">{letter}</div>
              <div className="grid grid-cols-3 gap-4 w-full">
                {getRange(letter).map((num) => {
                  const isSelected = selectedNumbers.includes(num)
                  return (
                    <motion.div
                      key={num}
                      onClick={() => handleNumberClick(letter, num)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center font-bold rounded-full text-3xl sm:text-4xl md:text-5xl transition-all duration-200 ${
                        isSelected
                          ? 'bg-green-500 text-black scale-110'
                          : `bg-gray-700 ${interactiveMode ? 'hover:bg-yellow-400 cursor-pointer' : 'cursor-default'}`
                      }`}
                      whileTap={interactiveMode ? { scale: 0.9 } : undefined}
                    >
                      {num}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
