import { NumberBingo } from "../entities/NumberBingo";

export interface NumberBingoRepository {
    getAll():Promise<NumberBingo[]>;
    // create(numberBingo: Omit<NumberBingo, "id">):Promise<NumberBingo>;
    create(number: number):Promise<boolean>;
    delete(id:string):Promise<void>;

    subscribeToNumbers(callback:(numbers: NumberBingo[])=> void) : ()=> void;
}