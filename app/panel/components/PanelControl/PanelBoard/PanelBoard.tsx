"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

import { cn } from "@/lib/utils";
import { CreateNumberBingoUseCase } from "@/src/application/usecases/CreateNumberBingoUseCase";
import { DeleteNumberBingoUseCase } from "@/src/application/usecases/DeleteNumberBingoUseCase";
import { NumberBingo } from "@/src/domain/entities/NumberBingo";
import { FirebaseNumberBingoRepository } from "@/src/infrastructure/repositories/FirebaseNumberBingoRepository";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export function PanelBoard({ drawnNumbers }: { drawnNumbers: NumberBingo[] }) {
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);

  const columns = [
    { letter: "B", range: [1, 15] },
    { letter: "I", range: [16, 30] },
    { letter: "N", range: [31, 45] },
    { letter: "G", range: [46, 60] },
    { letter: "O", range: [61, 75] },
  ];

  const numbersPick = drawnNumbers.map((row) => row.number);

  const [loading, setLoading] = useState(false);

  const handleSubmitCreate = async (num: number) => {
    try {
      setLoading(true);
      const numberBingoRepository = new FirebaseNumberBingoRepository();
      const createNumberBingouseCase = new CreateNumberBingoUseCase(
        numberBingoRepository
      );

      const result = await createNumberBingouseCase.execute(num);
      if (result) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitDelete = async (number: number) => {
    try {
      setLoading(true);
      const numberBingoRepository = new FirebaseNumberBingoRepository();
      const deleteNumberBingoUseCase = new DeleteNumberBingoUseCase(
        numberBingoRepository
      );
      await deleteNumberBingoUseCase.execute(number);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "No se pudo restablecer el numero",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      toast({
        title: "Correcto",
        description: "Se restablecio el numero exitosamente",
      });
    }
  };

  return (
    <Card className="p-1 w-full h-auto flex items-center justify-center">
      <div className="grid grid-cols-5 gap-1 w-full max-w-4xl h-auto">
        {columns.map(({ letter, range }) => (
          <div key={letter} className="space-y-1 h-auto">
            <div className="h-16 flex items-center justify-center font-bold text-4xl bg-blue-500 text-primary-foreground rounded">
              {letter}
            </div>
            {numbers
              .filter((n) => n >= range[0] && n <= range[1])
              .map((number) =>
                numbersPick.includes(number) ? (
                  <div
                    key={number}
                    className={cn(
                      "h-12 flex items-center justify-center rounded text-2xl font-medium transition-colors",

                      "text-primary-foreground"
                    )}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="h-full w-full text-2xl"
                          variant={"destructive"}
                        >
                          {number}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle className="text-center">
                            ¿Está seguro?
                          </DialogTitle>
                          <DialogDescription className="text-center">
                            Que desea restablecer el numero{" "}
                            <span className="font-bold">{number}</span>
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="sm:justify-center">
                          <Button
                            variant="destructive"
                            disabled={loading}
                            onClick={async () =>
                              await handleSubmitDelete(number)
                            }
                          >
                            {loading && (
                              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Si
                          </Button>

                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              No
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <div
                    key={number}
                    className={
                      "h-12 flex items-center justify-center rounded text-2xl font-medium transition-colors bg-muted"
                    }
                  >
                    <Button
                      className="h-full w-full text-2xl"
                      type="button"
                      onClick={async () => await handleSubmitCreate(number)}
                      variant={"outline"}
                      disabled={loading}
                    >
                      {number}
                    </Button>
                  </div>
                )
              )}
          </div>
        ))}
      </div>
    </Card>
  );
}
