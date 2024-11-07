import { signInWithEmailAndPassword, User, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export class AuthRepository {
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}