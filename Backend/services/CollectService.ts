import { AppError } from "../errors/AppError.js";
import type { ICollectPoint } from "../interfaces/ICollect.js";
import type { CollectRepository } from "../repository/CollectRepository.js";

export class CollectService {
    constructor(private collectRepository: CollectRepository) {};

    async selectAllCollect(): Promise<ICollectPoint[]> {
        try {
            return await this.collectRepository.selectAllCollect();
        } catch(error) {
            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }

    async insertCollect(collectData: Omit<ICollectPoint, "_id">): Promise<ICollectPoint> {
        try {
            return await this.collectRepository.insertCollect(collectData);
        } catch(error) {
            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }

    async deleteCollect(id: string): Promise<Boolean> {
        try {
            return await this.collectRepository.deleteCollect(id);
        } catch(error) {
            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }

    async updateCollect(id: string, collectData: Partial<ICollectPoint>): Promise<Boolean> {
        try {
            return await this.collectRepository.updateCollect(id, collectData);
        } catch(error) {
            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }
}