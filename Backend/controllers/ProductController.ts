import { AppError } from "../errors/AppError.js";
import type { ICampaignProduct } from "../interfaces/IProduct.js";
import { ProductService } from "../services/ProductService.js";
import type { Request, Response } from "express";
import { removeUndefined } from "../utils.js";

export class ProductController {
    constructor(private productService: ProductService) {};

    async selectAllProduct(req: Request, res: Response): Promise<Response> {
        try {
            const selectRes = await this.productService.selectAllProduct();

            return res.status(200).json({ message: "Successful products select", data: selectRes });
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            });
        }
    }

    async insertProduct(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        const name = body.name;
        const description = body.description;
        const price = body.price;
        const images = body.images;
        const isAvailable = body.isAvailable;

        const productData: Omit<ICampaignProduct, "_id"> = {
            name,
            description,
            price,
            images,
            isAvailable
        };
        console.log("Chegou no try");
        try {
            const insertRes = await this.productService.insertProduct(productData);

            return res.status(201).json({ message: "Successful product insert", data: insertRes });
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        const id = body.id;

        try {
            const deleteRes = await this.productService.deleteProduct(id);

            if(!deleteRes) {
                console.log("Product not found");
                throw new AppError("RESOURCE_NOT_FOUND");
            }

            return res.status(200).json({ message: "Successful product delete" });
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            });
        }
    }

    async updateProduct(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        const id = body.id;
        const name = body.name;
        const description = body.description;
        const price = body.price;
        const images = body.images;
        const isAvailable = body.isAvailable;

        const productData: Omit<ICampaignProduct, "_id"> = {
            name,
            description,
            price,
            images,
            isAvailable
        };

        const productData_defined = removeUndefined(productData);

        try {
            const updateRes = await this.productService.updateProduct(id, productData_defined);

            if(!updateRes) {
                throw new AppError("RESOURCE_NOT_FOUND");
            }

            return res.status(200).json({ message: "Successful product update" });
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            });
        }
    }
}