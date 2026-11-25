import { ObjectId, type Collection } from "mongodb";
import type { ICollectPoint } from "../interfaces/ICollect.js";


export class CollectRepository {
    constructor(private collectCollection: Collection<ICollectPoint>) {};

    async selectAllCollect(): Promise<ICollectPoint[]> {
        return await this.collectCollection.find({}).toArray();
    }

    async insertCollect(collectData: Omit<ICollectPoint, "_id">): Promise<ICollectPoint> {
        const res = await this.collectCollection.insertOne(collectData);
        return {
            _id: res.insertedId,
            ...collectData
        }
    }

    async deleteCollect(id: string): Promise<Boolean> {
        const res = await this.collectCollection.deleteOne({ _id: new ObjectId(id) });
        return res.deletedCount > 0;
    }

    async updateCollect(id: string, collectData: Partial<ICollectPoint>): Promise<Boolean> {
        const res = await this.collectCollection.updateOne({ _id: new ObjectId(id) }, { $set: collectData });
        return res.modifiedCount > 0;
    }
}