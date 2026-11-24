import { EntityService } from "../services/EntityService.js";
import { AppError, ErrorCodes } from "../errors/AppError.js";
import type { Request, Response } from "express";

export class EntityController {
    constructor(private entityService: EntityService) {}

    private handleError(res: Response, err: unknown, fallbackMessage: string): Response {
        if (err instanceof AppError) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            });
        }

        console.error("[ENTITY_CONTROLLER]:", err);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: fallbackMessage || ErrorCodes.INTERNAL_SERVER_ERROR.message,
            status: 500
        });
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const entities = await this.entityService.getAll();
            return res.status(200).json(entities);
        } catch (err: unknown) {
            return this.handleError(res, err, "Erro ao buscar entidades beneficiadas");
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (!id || typeof id !== "string") {
                throw new AppError("VALIDATION_ERROR");
            }

            const entity = await this.entityService.getById(id);
            return res.status(200).json(entity);
        } catch (err: unknown) {
            return this.handleError(res, err, "Erro ao buscar entidade");
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const body: unknown = req.body;

            if (!body || typeof body !== "object") {
                throw new AppError("VALIDATION_ERROR");
            }

            const newEntity = await this.entityService.create(body as Record<string, unknown>);
            return res.status(201).json({
                message: "Entidade cadastrada com sucesso",
                data: newEntity
            });
        } catch (err: unknown) {
            return this.handleError(res, err, "Erro ao cadastrar entidade");
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body: unknown = req.body;

            if (!id || typeof id !== "string") {
                throw new AppError("VALIDATION_ERROR");
            }

            if (!body || typeof body !== "object") {
                throw new AppError("VALIDATION_ERROR");
            }

            await this.entityService.update(id, body as Record<string, unknown>);
            return res.status(200).json({
                message: "Entidade atualizada com sucesso"
            });
        } catch (err: unknown) {
            return this.handleError(res, err, "Erro ao atualizar entidade");
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (!id || typeof id !== "string") {
                throw new AppError("VALIDATION_ERROR");
            }

            await this.entityService.delete(id);
            return res.status(200).json({
                message: "Entidade removida com sucesso"
            });
        } catch (err: unknown) {
            return this.handleError(res, err, "Erro ao remover entidade");
        }
    }
}