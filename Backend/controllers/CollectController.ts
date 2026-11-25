import { AppError } from "../errors/AppError.js";
import type { ICollectPoint } from "../interfaces/ICollect.js";
import type { CollectService } from "../services/CollectService.js";
import type { Request, Response } from "express";

export class CollectController {
    constructor(private collectService: CollectService) {};

    async selectAllCollect(req: Request, res: Response): Promise<Response> {
        try {
            const selectRes = await this.collectService.selectAllCollect();
            return res.status(200).json({ message: "Selection successfully completed", data: selectRes });
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            })
        }
    }

    async insertCollect(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        const name = body.name;
        const neighborhood = body.neighborhood;
        const address = body.address;
        const lat = body.lat;
        const lng = body.lng;
        const operatingHours = body.operatingHours;
        const isActive = body.isActive;

        const collectData: Omit<ICollectPoint, "_id"> = {
            name,
            neighborhood,
            address,
            coordinates: {
                lat,
                lng
            },
            isActive,
            ...(operatingHours !== undefined && { operatingHours })
        }
        
        try {
            const insertRes = await this.collectService.insertCollect(collectData);

            return res.status(201).json({ message: "Insert successfully completed", data: insertRes })
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            })
        }
    }

    async deleteCollect(req: Request, res: Response): Promise<Response> {
        const id = req.body.id;
        
        try {
            const deleteRes = await this.collectService.deleteCollect(id);
            
            if(!deleteRes) {
                throw new AppError("RESOURCE_NOT_FOUND");
            }

            return res.status(200).json({ message: "Delete successfully completed" });
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            })
        }
    }

    async updateCollect(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        const id = body.id;
        const name = body.name;
        const neighborhood = body.neighborhood;
        const address = body.address;
        const lat = body.lat;
        const lng = body.lng;
        const operatingHours = body.operatingHours;
        const isActive = body.isActive;

        const collectData: Omit<ICollectPoint, "_id"> = {
            name,
            neighborhood,
            address,
            coordinates: {
                lat,
                lng
            },
            isActive,
            operatingHours
        }

        const collectData_defined = removeUndefined(collectData);

        try {
            const updateRes = await this.collectService.updateCollect(id, collectData_defined);

            if(!updateRes) {
                throw new AppError("RESOURCE_NOT_FOUND");
            }

            return res.status(200).json({ message: "Update successfully completed" });
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            })
        }
    }
}