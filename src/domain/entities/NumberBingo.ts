import { Timestamp } from "firebase/firestore";

export interface NumberBingo{
    id: string;
    number: number;
    hasComeOut: boolean;
    createdAt: Timestamp;
}