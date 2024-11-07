import { LogoutUseCase } from "@/src/application/usecases/LogoutUseCase";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <Button type="button" onClick={handleLogout} variant="ghost">
      <LogOut />
    Cerrar Sesión
    </Button>
  )
}
