import { NumberBingoRepository } from "@/src/domain/repositories/NumberBingoRepository";

export class DeleteNumberBingoUseCase{
    constructor(private numberBingoRepository: NumberBingoRepository){}
    async execute(number: number): Promise<void>{
        await this.numberBingoRepository.delete(number)
    }
}