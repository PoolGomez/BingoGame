"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { LogIn, Play } from "lucide-react";
import { Footer } from "@/components/Footer";
import { BingoLettersAnimated } from "@/components/BingoLettersAnimated";
import Image from "next/image";

export default function Home() {
  const texto = "BINGO";
  const letters = texto.split("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}

<Image
              alt="image"
              src="/images/bingo-screen.png"
              width={1920}
              height={1440}
              className="absolute inset-0 h-full w-full opacity-30"
            />

<BingoLettersAnimated texto="BINGO" />
        {/* <div className="flex justify-center items-center space-x-8 text-7xl font-bold">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              animate={{
                y: ["0%", "-30%", "0%"], // Rebote: sube y baja
              }}
              transition={{
                duration: 0.6, // Duración de cada rebote
                repeat: Infinity, // Repetir indefinidamente
                repeatType: "loop", // Tipo de repetición en bucle
                delay: index * 0.1, // Retraso para cada letra en el rebote
                ease: "easeInOut", // Suavizado de la animación
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </div> */}

        {/* <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}

        <div className="flex gap-4 z-20 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/login"
            // target="_blank"
            rel="login"
          >
            {/* <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            /> */}
            <LogIn />
            Iniciar Sesión
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/bingo"
            // target="_blank"
            rel="bingo"
          >
            <Play /> Ver Bingo
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
