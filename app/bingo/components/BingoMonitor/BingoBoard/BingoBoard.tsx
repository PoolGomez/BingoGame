"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NumberBingo } from "@/src/domain/entities/NumberBingo";
import React from "react";


export function BingoBoard({ drawnNumbers }: {drawnNumbers:NumberBingo[]}) {
    const numbers = Array.from({ length: 75 }, (_, i) => i + 1);

    const columns = [
      { letter: "B", range: [1, 15] },
      { letter: "I", range: [16, 30] },
      { letter: "N", range: [31, 45] },
      { letter: "G", range: [46, 60] },
      { letter: "O", range: [61, 75] },
    ];

    const numbersPick = drawnNumbers.map((row)=> row.number )
  
    return (
      <Card className="p-2 w-full h-screen flex items-center justify-center">
        <div className="grid grid-cols-5 gap-1 w-full">
          {columns.map(({ letter, range }) => (
            <div key={letter} className="space-y-1">
              <div className="h-10 flex items-center justify-center font-bold text-4xl bg-blue-500 text-primary-foreground rounded">
                {letter}
              </div>
              {numbers
                .filter((n) => n >= range[0] && n <= range[1])
                .map((number) => (
                  <div
                    key={number}
                    className={cn(
                      "h-12 lg:h-14 flex items-center justify-center rounded font-bold text-slate-400 transition-colors",
                      numbersPick.includes(number)
                        ? "bg-yellow-400 text-secondary-foreground text-5xl lg:text-6xl"
                        : "bg-slate-800 text-4xl lg:text-5xl"
                    )}
                  >
                    {number}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </Card>
    );
}


