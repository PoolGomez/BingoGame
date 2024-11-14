"use client";

import { Footer } from "@/components/Footer";
import { AuthRepository } from "@/src/infrastructure/repositories/AuthRepository";
import { LoginUseCase } from "@/src/application/usecases/LoginUseCase";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { BingoLettersAnimated } from "@/components/BingoLettersAnimated";
import Image from "next/image";
import { UserAuthForm } from "./components";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";

const authRepository = new AuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

interface AuthError extends Error {
  code?: string; // La propiedad code es opcional
}

export default function AuthenticationPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition()

  const handleLogin = async (email: string, password: string) => {
    startTransition(async ()=>{
      try {
        const user = await loginUseCase.execute(email, password);
        const token = await user.getIdToken();
        if(!user){
          toast({
            title:"❌ Error",
            description:"Credenciales Incorrectas",
          })
        }else{
  
          setCookie(null, "token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
  
          router.push("/panel");
          
          toast({
            title:"✅ Correcto",
            description:"Ingreso exitoso",
          })
        }
        
      } catch (error: unknown) {
        console.log(error)
        // Verificar si el error es una instancia de Error
        if (isAuthError(error)) {
          if (error.code === "auth/invalid-credential") {
            toast({
              title: "❌ Error",
              description: "Credenciales Inválidas",
            });
          } else {
            // Manejo de otros errores
            toast({
              title: "❌ Error",
              description: error.message,
            });
          }
        } else {
          // Manejo de errores desconocidos
          toast({
            title: "❌ Error",
            description: "Ocurrió un error desconocido.",
          });
        }
        
      }
    })
    
  };
  function isAuthError(error: unknown): error is AuthError {
    return (error as AuthError).code !== undefined;
  }

  return (
    <>
      
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          
          <div className="relative z-20 flex items-center text-2xl font-bold text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Bingo Monitor
          </div>
          <div className="items-center justify-center">
            <Image
              alt="image"
              src="/images/bingo-screen.png"
              width={1920}
              height={1440}
              className="absolute inset-0 h-full w-full opacity-30"
            />
          </div>

          <div className="relative z-20 mt-auto">
            <Footer />
          </div>
        </div>
        <div className="p-8 items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <BingoLettersAnimated texto="BINGO" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Iniciar Sesión
              </h1>
              <p className="text-sm text-muted-foreground">
                Ingrese su email y su contraseña para entrar
              </p>
            </div>
            <UserAuthForm onLogin={handleLogin} isPending={isPending} />
            
          </div>
          
        </div>
      </div>
    </>
  );
}
