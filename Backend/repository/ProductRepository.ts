import { Collection, ObjectId } from "mongodb";

import type { ICampaignProduct } from "../interfaces/IProduct.js";

export class ProductRepository {
    constructor(private productCollection: Collection<ICampaignProduct>) {};

    async selectAllProduct(): Promise<ICampaignProduct[]> {
        return await this.productCollection.find({}).toArray();
    }

    async insertProduct(productData: Omit<ICampaignProduct, "_id">): Promise<ICampaignProduct> {
        const res = await this.productCollection.insertOne(productData); // Retorna acknowledged e insertedId
        return {
            _id: res.insertedId,
            ...productData
        }
    }

    async deleteProduct(id: string): Promise<Boolean> {
        const res = await this.productCollection.deleteOne({ _id: new ObjectId(id) }); // Retorna acknowledged e deletedCount
        return res.deletedCount > 0;
    }

    async updateProduct(id: string, productData: Partial<ICampaignProduct>): Promise<Boolean> {
        const res = await this.productCollection.updateOne({ _id: new ObjectId(id) }, { $set: productData });
        return res.modifiedCount > 0;
    }
}