import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numeroAletraBingo(numero:number | null): string {
  if(numero){

    if (numero < 1 || numero > 75) {
      return "Número fuera de rango. Debe estar entre 1 y 75.";
    }
    let letra: string;
    if (numero >= 1 && numero <= 15) {
        letra = 'B';
    } else if (numero >= 16 && numero <= 30) {
        letra = 'I';
    } else if (numero >= 31 && numero <= 45) {
        letra = 'N';
    } else if (numero >= 46 && numero <= 60) {
        letra = 'G';
    } else {
        letra = 'O';
    }
    return letra;
  }
  return ""
  
  
}
