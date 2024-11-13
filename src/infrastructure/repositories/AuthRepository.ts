import { signInWithEmailAndPassword, User, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
// import { LoginResponse } from "@/src/domain/entities/LoginResponse";

export class AuthRepository {
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // await signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential)=>{
    //     return {
    //       code: "success",
    //       message: "Login Correcto",
    //       data: userCredential,
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     return {
    //       code: "error",
    //       message: "Credenciales Inválidas",
    //       data: null,
    //     }
    //   })
    // console.log("[AuthRepository]",userCredential);
    return userCredential.user;
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}