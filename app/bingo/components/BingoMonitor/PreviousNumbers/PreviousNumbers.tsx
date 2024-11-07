"use client"

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedRecentNumbers } from "./AnimatedRecentNumbers";
import { NumberBingo } from "@/src/domain/entities/NumberBingo";
  
export function PreviousNumbers({ numbers }: {numbers:NumberBingo[]}) {

    const numeros = numbers.map((numer)=>numer.number);

  return (
    <Card className="p-6 flex-grow h-1/3">
      <h3 className="text-lg font-semibold mb-4">Números Recientes</h3>
      <ScrollArea 
      className="h-[calc(90%-2rem)] w-full rounded-md border p-4"
      >
        <div className="flex flex-wrap gap-2">
          
          <AnimatedRecentNumbers numbers={numeros} />
        </div>
      </ScrollArea>
    </Card>
  )
}
