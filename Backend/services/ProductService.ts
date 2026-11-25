import type { ICampaignProduct } from "../interfaces/IProduct.js";
import type { ProductRepository } from "../repository/ProductRepository.js";

export class ProductService {
    constructor(private productRepository: ProductRepository) {};

    async selectAllProduct(): Promise<ICampaignProduct[]> {
        return await this.productRepository.selectAllProduct();
    }

    async insertProduct(productData: Omit<ICampaignProduct, "_id">): Promise<ICampaignProduct> {
        return await this.productRepository.insertProduct(productData);
    }

    async deleteProduct(id: string): Promise<Boolean> {
        return await this.productRepository.deleteProduct(id);
    }

    async updateProduct(id: string, productData: Partial<ICampaignProduct>): Promise<Boolean> {
        return await this.productRepository.updateProduct(id, productData);
    }
}