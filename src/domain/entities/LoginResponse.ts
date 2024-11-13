import { User } from "firebase/auth";

export interface LoginResponse{
    code: string;
    message: number;
    data: User | null;
}