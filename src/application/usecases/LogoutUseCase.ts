import { auth } from "@/src/infrastructure/firebase/firebase";
import { destroyCookie } from "nookies";

export class LogoutUseCase {
    async execute(){
        try {
            // cierra sesion en firebase
            await auth.signOut();
            //eliomina la cookie del token

            destroyCookie(null, "token",{path:"/"});

        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
            throw new Error("Error al cerrar sesión");
            
        }
    }
}