"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Hash, RotateCcw, Shuffle, Trophy } from "lucide-react";
import { useState } from "react";

function BingoPage() {
   const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const [showAll, setShowAll] = useState(false);

  // Generar números disponibles (1-75)
  const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
  
  // Obtener números disponibles
  const availableNumbers = allNumbers.filter(num => !calledNumbers.includes(num));

  // Obtener los últimos 5 números llamados
  const recentNumbers = calledNumbers.slice(-5).reverse();

  // Función para sacar bolilla
  const drawNumber = () => {
    if (availableNumbers.length === 0) return;
    
    setIsDrawing(true);
    setGameStarted(true);
    
    // Simular animación de sorteo
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const drawnNumber = availableNumbers[randomIndex];
      
      setCalledNumbers(prev => [...prev, drawnNumber]);
      setLastNumber(drawnNumber);
      setIsDrawing(false);
    }, 1000);
  };

  // Función para reiniciar juego
  const resetGame = () => {
    setCalledNumbers([]);
    setLastNumber(null);
    setGameStarted(false);
    setIsDrawing(false);
  };

  // Función para obtener la letra de columna
//   const getColumnLetter = (number: number): string => {
//     if (number <= 15) return 'B';
//     if (number <= 30) return 'I';
//     if (number <= 45) return 'N';
//     if (number <= 60) return 'G';
//     return 'O';
//   };

  // Función para obtener el color de la columna
//   const getColumnColor = (number: number): string => {
//     if (number <= 15) return 'border-red-500 bg-red-50';
//     if (number <= 30) return 'border-blue-500 bg-blue-50';
//     if (number <= 45) return 'border-green-500 bg-green-50';
//     if (number <= 60) return 'border-yellow-500 bg-yellow-50';
//     return 'border-purple-500 bg-purple-50';
//   };

  // Función para obtener el color de fondo de la columna
  const getColumnBgColor = (number: number): string => {
    if (number <= 15) return 'bg-red-500';
    if (number <= 30) return 'bg-blue-500';
    if (number <= 45) return 'bg-green-500';
    if (number <= 60) return 'bg-yellow-500';
    return 'bg-purple-500';
  };
  const ChangeShowAll = () => {
    setShowAll(!showAll);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Tablero de Bingo
          </h1>
          {/* <p className="text-slate-600">Bingo de 75 números - B-I-N-G-O</p> */}
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> */}

            {/* Tablero Principal */}
            {/* Tablero Principal - Horizontal */}
        <Card className="bg-white shadow-lg border-0 mb-8">
          {/* <CardHeader>
            <CardTitle className="text-center text-2xl text-slate-800">
              Tablero de Números
            </CardTitle>
          </CardHeader> */}
          <CardContent>
            <div className="overflow-x-auto">
              <div className="space-y-3">
                {['B', 'I', 'N', 'G', 'O'].map((letter, letterIndex) => {
                  const startNumber = letterIndex * 15 + 1;
                //   const endNumber = (letterIndex + 1) * 15;
                  const numbers = Array.from({ length: 15 }, (_, i) => startNumber + i);
                  
                  return (
                    <div key={letter} className="flex items-center space-x-2">
                      {/* Letra de la columna */}
                      <div className={`w-32 h-32 rounded-lg font-bold text-8xl text-white flex items-center justify-center flex-shrink-0 ${
                        letterIndex === 0 ? 'bg-red-500' :
                        letterIndex === 1 ? 'bg-blue-500' :
                        letterIndex === 2 ? 'bg-green-500' :
                        letterIndex === 3 ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }`}>
                        {letter}
                      </div>
                      
                      {/* Números de la fila */}
                      <div className="flex flex-1 gap-1">
                        {numbers.map((number) => {
                          const isCalled = calledNumbers.includes(number);
                          const isLastCalled = lastNumber === number;
                          const isRecent = recentNumbers.includes(number);
                          
                          return (
                            <div
                              key={number}
                              className={`
                                flex-1 aspect-square rounded-lg border-2 flex items-center justify-center text-8xl font-semibold min-w-0
                                transition-all duration-300 transform
                                ${isCalled && letterIndex === 0 ? 'bg-red-400 text-black border-red-600 shadow-lg' : 
                                 isCalled && letterIndex === 1 ? 'bg-blue-400 text-black border-blue-600 shadow-lg' :
                                 isCalled && letterIndex === 2 ? 'bg-green-300 text-black border-green-600 shadow-lg' :
                                 isCalled && letterIndex === 3 ? 'bg-yellow-200 text-black border-yellow-600 shadow-lg' :
                                 isCalled && letterIndex === 4 ? 'bg-purple-300 text-black border-purple-600 shadow-lg' :
                                 showAll ? 'bg-white text-slate-400 border-slate-200 hover:border-slate-300' :
                                 'bg-white text-white border-slate-200 hover:border-slate-300'
                                }
                                  
                                ${isLastCalled ? 'ring-4 ring-green-300 animate-pulse' : ''}
                                ${isRecent && !isLastCalled ? 'ring-2 ring-green-200' : ''}
                              `}
                            >
                              {number}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Panel de Control */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Último Número */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-slate-700">
                  {lastNumber ? 'Último Número' : 'Próximo Número'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {isDrawing ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full w-36 h-36 border-4 border-blue-500 border-t-transparent">
                    </div>
                    {/* <p className="text-slate-500 absolute transform -translate-x-0">Sacando bolilla...</p> */}
                    
                  </div>
                ) : lastNumber ? (
                  <div className="space-y-4">
                    <div className={`inline-flex items-center justify-center w-48 h-48 rounded-full border-4 text-[7rem] font-bold ${ getColumnBgColor(lastNumber)}`}>
                      {lastNumber}
                    </div>
                    {/* <div className="text-center">
                      <Badge variant="outline" className="text-2xl px-4 py-2">
                        {getColumnLetter(lastNumber)}-{lastNumber}
                      </Badge>
                    </div> */}
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-36 h-36 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center">
                      <Hash className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500">Sacar Bolilla</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Números Recientes */}
            {gameStarted && recentNumbers.length > 0 && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-lg text-slate-700 ">
                    {/* <Clock className="w-5 h-5 mr-2" /> */}
                    Números Recientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gameStarted && recentNumbers.length > 0 ? (
                <div className="flex justify-center items-center flex-wrap gap-3">
                  {recentNumbers.slice(0, 5).map((number, index) => (
                    <div 
                      key={`${number}-${calledNumbers.indexOf(number)}`}
                      className="relative flex flex-col items-center"
                    >
                      
                      
                      {/* Bolilla */}
                      <div 
                        className={`w-[20vw] max-w-[8rem] aspect-square rounded-full flex items-center justify-center text-black font-bold text-[3vw] max-text-[4rem] shadow-lg transition-all duration-300 ${
                          getColumnBgColor(number)
                        } 
                          ${
                          index === 0 
                            ? 'ring-4 ring-green-300 scale-105' 
                            : 'opacity-80'
                        }
                            `}
                      >
                        {number}
                      </div>

                      {/* Indicador de "Último" */}
                      {index === 0 && (
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 pt-12">
                          <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                            Último
                          </Badge>
                        </div>
                      )}
                      
                      {/* Letra y orden */}
                      {/* <div className="mt-2 text-center">
                        <p className="font-semibold text-slate-800 text-sm">
                          {getColumnLetter(number)}-{number}
                        </p>
                        <p className="text-xs text-slate-500">
                          #{calledNumbers.length - index}
                        </p>
                      </div> */}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Los números recientes aparecerán aquí</p>
                </div>
              )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Controles */}
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button 
                    onClick={drawNumber}
                    disabled={availableNumbers.length === 0 || isDrawing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    <Shuffle className="w-5 h-5 mr-2" />
                    {isDrawing ? 'Sacando...' : 'Sacar Bolilla'}
                  </Button>
                  <div className="flex space-x-2">
                    <Button 
                        onClick={resetGame}
                        variant="outline"
                        className="w-full py-6 text-lg font-semibold border-2 hover:bg-slate-50 transition-all duration-200"
                    >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Reiniciar Juego
                    </Button>

                    <Button 
                        onClick={ChangeShowAll}
                    variant="outline" className="w-full py-6 text-lg font-semibold border-2 hover:bg-slate-50 transition-all duration-200">
                        Mostrar Números
                    </Button>
                  </div>
                  
                  

                   <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{calledNumbers.length}</p>
                    <p className="text-sm text-slate-600">Números Llamados</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{availableNumbers.length}</p>
                    <p className="text-sm text-slate-600">Disponibles</p>
                  </div>
                </div>
                
                {availableNumbers.length === 0 && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <Trophy className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-semibold">¡Juego Completado!</p>
                  </div>
                )}

                </div>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            {/* <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{calledNumbers.length}</p>
                    <p className="text-sm text-slate-600">Números Llamados</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{availableNumbers.length}</p>
                    <p className="text-sm text-slate-600">Disponibles</p>
                  </div>
                </div>
                
                {availableNumbers.length === 0 && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <Trophy className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-semibold">¡Juego Completado!</p>
                  </div>
                )}
              </CardContent>
            </Card> */}
          </div>

          


        {/* </div> */}
      </div>
    </div>
  );
}

export default BingoPage;
