"use client"

import {FormEvent, useState} from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"

type LoginFormProps = {
  onLogin:(email: string, passwortd: string) => void;
  isPending: boolean
}

export function UserAuthForm(props: LoginFormProps) {
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [isPending, startTransition] = useTransition();
  const {onLogin,isPending} = props;

  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent)=>{
    
    
      event.preventDefault();
      try {
        onLogin(email,password);
      } catch (error) {
        console.log(error)
      }
    
    
    
  }

  const redirectHome=()=>{
    router.push("/")
  }

  return (
    <div className="grid gap-6 p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Ingrese su email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // disabled={isLoading}
              disabled={isPending}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Contraseña
            </Label>
            <Input
              id="password"
              placeholder="ingrese su contraseña"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // disabled={isLoading}
              disabled={isPending}
            />
          </div>


          <Button type="submit" disabled={isPending}>
            {isPending && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            
            Ingresar
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            
          </span>
        </div>
      </div>
        <Button variant="outline" type="button" disabled={isPending} onClick={redirectHome}>
          {isPending ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowLeft className="mr-2 h-4 w-4" />
          )}{" "}
          Regresar
        </Button>
      
    </div>
  )
}