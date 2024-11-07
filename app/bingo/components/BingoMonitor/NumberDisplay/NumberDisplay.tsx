"use client";

import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { AnimatedCurrentNumber } from "./AnimatedCurrentNumber";

interface NumberDisplayProps {
  currentNumber: number | null;
  isGameComplete: boolean;
}

export function NumberDisplay({
  currentNumber,
  isGameComplete,
}: NumberDisplayProps) {
  return (
    <Card className="p-2 text-center text-foreground h-2/3">
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
    </Card>
  );
}
