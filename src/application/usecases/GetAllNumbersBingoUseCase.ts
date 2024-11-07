import { NumberBingo } from "@/src/domain/entities/NumberBingo";
import { NumberBingoRepository } from "@/src/domain/repositories/NumberBingoRepository";

export class GetAllNumbersBingoUseCase{
    constructor(private numberBingoRepository: NumberBingoRepository){}

    async execute(): Promise<NumberBingo[]>{
        return await this.numberBingoRepository.getAll();
    }
}