import { AppError } from "../errors/AppError.js";
import type { ICampaignProduct } from "../interfaces/IProduct.js";
import type { ProductRepository } from "../repository/ProductRepository.js";

export class ProductService {
    constructor(private productRepository: ProductRepository) {};

    async selectAllProduct(): Promise<ICampaignProduct[]> {
        try {
            return await this.productRepository.selectAllProduct();
        } catch(error) {
            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }

    async insertProduct(productData: Omit<ICampaignProduct, "_id">): Promise<ICampaignProduct> {
        try {
            return await this.productRepository.insertProduct(productData);
        } catch(error) {
            console.log(error);
            console.log("Erro service");
            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }

    async deleteProduct(id: string): Promise<Boolean> {
        try {
            return await this.productRepository.deleteProduct(id);
        } catch(error) {
            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }

    async updateProduct(id: string, productData: Partial<ICampaignProduct>): Promise<Boolean> {
        try {
            return await this.productRepository.updateProduct(id, productData);
        } catch(error) {
            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }
}