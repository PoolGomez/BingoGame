import { NumberBingoRepository } from "@/src/domain/repositories/NumberBingoRepository";

export class DeleteNumberBingoUseCase{
    constructor(private numberBingoRepository: NumberBingoRepository){}
    async execute(id: string): Promise<void>{
        await this.numberBingoRepository.delete(id)
    }
}