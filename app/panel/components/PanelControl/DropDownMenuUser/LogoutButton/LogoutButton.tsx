import { LogoutUseCase } from "@/src/application/usecases/LogoutUseCase";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export function LogoutButton() {
    const router = useRouter();
    const logoutUseCase = new LogoutUseCase();

    const handleLogout = async () => {
        try {
            await logoutUseCase.execute();
            router.push("/login")
        } catch (error) {
            console.error("Error al cerrar sesion:", error)
        }
    }

  return (
    <Button type="button" className="text-lg w-full items-center justify-start" onClick={handleLogout} variant="ghost">
      <Suspense fallback={<Loading />}>
            <LogOut />
            Cerrar Sesión
      </Suspense>
      
    </Button>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
