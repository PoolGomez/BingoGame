"use client";

import { Card } from "@/components/ui/card";
import { AnimatedCurrentNumber } from "./AnimatedCurrentNumber";

interface NumberDisplayProps {
  currentNumber: number | null;
}

export function NumberDisplay({
  currentNumber
}: NumberDisplayProps) {
  return (
    <Card className="p-2 text-center text-foreground h-2/3">
      
      <AnimatedCurrentNumber number={currentNumber} />
      
    </Card>
  );
}
