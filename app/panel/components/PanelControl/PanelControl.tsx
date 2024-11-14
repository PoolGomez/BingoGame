"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { NumberBingo } from "@/src/domain/entities/NumberBingo";
import { FirebaseNumberBingoRepository } from "@/src/infrastructure/repositories/FirebaseNumberBingoRepository";
import { SubscribeToNumbersUseCase } from "@/src/application/usecases/SubscribeToNumbersUseCase";
import { ResetButton } from "./ResetButton";
import { DropDownMenuUser } from "./DropDownMenuUser";
import { PanelBoard } from "./PanelBoard";

export function PanelControl() {
  const [numbers, setNumbers] = useState<NumberBingo[]>([]);

  useEffect(() => {
    try {
      const numbersRepository = new FirebaseNumberBingoRepository();
      const subscribeToNumbersUseCase = new SubscribeToNumbersUseCase(
        numbersRepository
      );

      const unsubscribe = subscribeToNumbersUseCase.execute((numbersList) => {
        setNumbers(numbersList);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-full h-full items-center justify-center">
      <div className="flex items-center justify-between p-2 border-4">
        <div className="flex space-x-4">
          <ResetButton />
          <Link href="/game" target="_blank">
            <Button variant="outline" className="text-lg">
              <Eye 
                className=""
              />
              Ver Transmisión
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center p-x-4">
          <DropDownMenuUser />
        </div>
      </div>
      <PanelBoard drawnNumbers={numbers} />
    </div>
  );
}
