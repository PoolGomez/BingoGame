import { NumberBingo } from "@/src/domain/entities/NumberBingo";
import { NumberBingoRepository } from "@/src/domain/repositories/NumberBingoRepository";

export class SubscribeToNumbersUseCase{
    constructor(private numbersRepository: NumberBingoRepository){}

    execute(callback: (numbers: NumberBingo[])=>void): ()=>void{
        return this.numbersRepository.subscribeToNumbers(callback);
    }
}