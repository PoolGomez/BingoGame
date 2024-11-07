import { NumberBingoRepository } from "@/src/domain/repositories/NumberBingoRepository";

export class CreateNumberBingoUseCase{
    constructor(private numberBingoRepository: NumberBingoRepository){}

    async execute(number: number): Promise<boolean>{
        return await this.numberBingoRepository.create(number);
    }
}