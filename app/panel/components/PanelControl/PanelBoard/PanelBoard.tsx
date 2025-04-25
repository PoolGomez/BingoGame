"use client";

import { Button } from "@/components/ui/button";
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

import { CreateNumberBingoUseCase } from "@/src/application/usecases/CreateNumberBingoUseCase";
import { DeleteNumberBingoUseCase } from "@/src/application/usecases/DeleteNumberBingoUseCase";
import { NumberBingo } from "@/src/domain/entities/NumberBingo";
import { FirebaseNumberBingoRepository } from "@/src/infrastructure/repositories/FirebaseNumberBingoRepository";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export function PanelBoard({ drawnNumbers }: { drawnNumbers: NumberBingo[] }) {
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
      console.log("numbersPick:",numbersPick)
    } catch (error) {
      console.log("[error]",error);
      alert(error)
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
        title: "❌ Error",
        description: "No se pudo restablecer el numero"
      });
    } finally {
      setLoading(false);
      toast({
        title: "✅ Correcto",
        description: "Se restablecio el numero exitosamente",
      });
    }
  };

  const arrayBingo = [
    {
      letter: "B",
      color: "bg-red-600",
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      letter: "I",
      color: "bg-yellow-500",
      numbers: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    },
    {
      letter: "N",
      color: "bg-green-700",
      numbers: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    },
    {
      letter: "G",
      color: "bg-sky-600",
      numbers: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    },
    {
      letter: "O",
      color: "bg-purple-600",
      numbers: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 p-2 h-full overflow-auto">
      {arrayBingo.map((bingo, index) => (
        <div key={index} className={`space-y-4 p-2 ${bingo.color} rounded-lg`}>
          <div
            className={`text-6xl lg:text-8xl font-bold text-center text-white [text-shadow:_4px_4px_0_rgb(0,0,0)] mb-2 lg:mb-4 `}
          >
            {bingo.letter}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
            {bingo.numbers.map((num) =>
              numbersPick.includes(num) ? (
                <div
                  key={num}
                  className="flex items-center justify-center rounded p-2 bg-white transition-all duration-300 transform "
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="h-full w-full text-xl md:text-2xl lg:text-5xl xl:text-7xl font-semibold text-gray-700 bg-[url('/images/check2.png')] bg-cover bg-center "
                        variant={"ghost"}
                        disabled={loading}
                      >
                        {num}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          ¿Está seguro?
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Que desea restablecer el numero{" "}
                          <span className="font-bold">{num}</span>
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="sm:justify-center">
                        <Button
                          variant="destructive"
                          disabled={loading}
                          onClick={async () => await handleSubmitDelete(num)}
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
                  key={num}
                  className={
                    // "h-12 flex items-center justify-center rounded text-2xl font-medium transition-colors bg-muted"
                    "flex items-center justify-center rounded p-2 bg-white transition-all duration-300 transform"
                  }
                >
                  <Button
                    className="h-full w-full text-xl md:text-2xl lg:text-5xl xl:text-7xl font-semibold text-black"
                    type="button"
                    onClick={async () => await handleSubmitCreate(num)}
                    variant={"ghost"}
                    disabled={loading}
                  >
                    {num}
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

{
  /* <Card className="p-1 w-full h-auto flex items-center justify-center">
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
    </Card> */
}
