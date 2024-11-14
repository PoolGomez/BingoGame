"use client"

// import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { AnimatedRecentNumbers } from "./AnimatedRecentNumbers";
import { NumberBingo } from "@/src/domain/entities/NumberBingo";
  
export function PreviousNumbers({ numbers }: {numbers:NumberBingo[]}) {

    // const numeros = numbers.map((numer)=>numer.number);
    const numeros = numbers.map((numer)=>  numer.number);

  return (

    <div className="grid grid-cols-6 gap-3">
      {numeros.slice(0, 6).map((num, index) => (
        <div
          key={num}
          className={`mini-bingo-ball ${index === 0 ? 'animate-slide-in' : ''}`}
          
        >
          <div className="ball-content">
            {/* <span className="ball-letter-small">{getLetter(num)}</span> */}
            <span className="ball-number-small">{num}</span>
          </div>
        </div>
      ))}
    </div>

    

    // <Card className="p-4 flex-col">
    //   <h3 className="text-lg font-semibold mb-2 ">Números Recientes</h3>
    //   <ScrollArea 
    //   className="h-[calc(90%-2rem)] w-full rounded-md border p-4"
    //   >
    //     <div className="flex flex-wrap gap-2">
          
    //       <AnimatedRecentNumbers numbers={numeros} />
    //     </div>
    //   </ScrollArea>
    // </Card>
  )
}

