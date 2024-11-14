"use client";
import { NumberBingo } from "@/src/domain/entities/NumberBingo";

export function BingoBoard({ drawnNumbers }: {drawnNumbers:NumberBingo[]}) {
  
  const numbersPick = drawnNumbers.map((row)=> row.number )

  const arrayB = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const arrayI = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  const arrayN = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
  const arrayG = [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
  const arrayO = [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];



  return (
    <div className="grid grid-cols-5 gap-2 p-0 h-full overflow-auto ">

        {/* B */}
        <div className={`space-y-4 p-2 bg-red-600`}>
          <div className={`text-6xl lg:text-8xl font-bold text-center text-white [text-shadow:_4px_4px_0_rgb(0,0,0)] mb-2 lg:mb-4 `}>B</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
            {arrayB.map((num)=>(
              <div key={num} className={`flex items-center justify-center text-xl md:text-2xl lg:text-5xl xl:text-7xl font-semibold rounded p-2 
                ${numbersPick.includes(num) ? 
                  `bg-white text-black `: 
                  'bg-white text-gray-100 '
                } transition-all duration-300 transform`}>{num}</div>  
            ))}
            
          </div>
        </div>

        {/* I */}
        <div className={`space-y-4 p-2 bg-yellow-500`}>
          <div className={`text-6xl lg:text-8xl font-bold text-center text-white [text-shadow:_4px_4px_0_rgb(0,0,0)] mb-2 lg:mb-4 `}>I</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
            {arrayI.map((num)=>(
              <div key={num} className={`flex items-center justify-center text-xl md:text-2xl lg:text-5xl xl:text-7xl font-semibold rounded p-2 ${numbersPick.includes(num) ? `bg-white text-black `: 'bg-white text-gray-100 '} transition-all duration-300 transform`}>{num}</div>  
            ))}
          </div>
        </div>

        {/* N */}
        <div className={`space-y-4 p-2 bg-green-700`}>
          <div className={`text-6xl lg:text-8xl font-bold text-center text-white [text-shadow:_4px_4px_0_rgb(0,0,0)] mb-2 lg:mb-4 `}>N</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
          {arrayN.map((num)=>(
              <div key={num} className={`flex items-center justify-center text-xl md:text-2xl lg:text-5xl xl:text-7xl font-semibold rounded p-2 ${numbersPick.includes(num) ? `bg-white text-black `: 'bg-white text-gray-100 '} transition-all duration-300 transform`}>{num}</div>  
            ))}
          </div>
        </div>

        {/* G */}
        <div className={`space-y-4 p-2 bg-sky-600`}>
          <div className={`text-6xl lg:text-8xl font-bold text-center text-white [text-shadow:_4px_4px_0_rgb(0,0,0)] mb-2 lg:mb-4 `}>G</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
          {arrayG.map((num)=>(
              <div key={num} className={`flex items-center justify-center text-xl md:text-2xl lg:text-5xl xl:text-7xl font-semibold rounded p-2 ${numbersPick.includes(num) ? `bg-white text-black `: 'bg-white text-gray-100 '} transition-all duration-300 transform`}>{num}</div>  
            ))}
          </div>
        </div>

        {/* O */}
        <div className={`space-y-4 p-2 bg-purple-600`}>
          <div className={`text-6xl lg:text-8xl font-bold text-center text-white [text-shadow:_4px_4px_0_rgb(0,0,0)] mb-2 lg:mb-4 `}>O</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
          {arrayO.map((num)=>(
              <div key={num} className={`flex items-center justify-center text-xl md:text-2xl lg:text-5xl xl:text-7xl font-semibold rounded p-2 ${numbersPick.includes(num) ? `bg-white text-black `: 'bg-white text-gray-100 '} transition-all duration-300 transform`}>{num}</div>  
            ))}
          </div>
        </div>


    </div>
  );
  
    // return (
    //   <Card className="p-2 w-full h-full flex items-center justify-center">
    //     <div className="grid grid-cols-15 gap-1 w-full">
    //       {columns.map(({ letter, range }) => (
    //         <div key={letter} className="space-y-1">
    //           <div className="h-10 flex items-center justify-center font-bold text-4xl bg-blue-500 text-primary-foreground rounded">
    //             {letter}
    //           </div>
    //           {numbers
    //             .filter((n) => n >= range[0] && n <= range[1])
    //             .map((number) => (
    //               <div
    //                 key={number}
    //                 className={cn(
    //                   "h-12 lg:h-14 flex items-center justify-center rounded font-bold text-slate-400 transition-colors",
    //                   numbersPick.includes(number)
    //                     ? "bg-yellow-400 text-secondary-foreground text-5xl lg:text-6xl"
    //                     : "bg-slate-800 text-4xl lg:text-5xl"
    //                 )}
    //               >
    //                 {number}
    //               </div>
    //             ))}
    //         </div>
    //       ))}
    //     </div>
    //   </Card>
    // );
}


