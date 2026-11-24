import { EntityRepository } from "../repository/EntityRepository.js";
import type { IEntity } from "../interfaces/IEntity.js";
import { ObjectId } from "mongodb";
import { AppError } from "../errors/AppError.js";

export class EntityService {
    constructor(private entityRepository: EntityRepository) {}

    // Retorna todas as entidades cadastradas
    async getAll(): Promise<IEntity[]> {
        try {
            return await this.entityRepository.selectAllEntities();
        } catch (err: unknown) {
            console.error("Erro ao buscar entidades no banco", err);
            throw new AppError("INTERNAL_SERVER_ERROR", { cause: err });
        }
    }

    // Busca uma entidade específica pelo ID validando o formato do ObjectId
    async getById(id: string): Promise<IEntity> {
        if (!ObjectId.isValid(id)) {
            throw new AppError("VALIDATION_ERROR");
        }

        try {
            const entity = await this.entityRepository.selectEntityById(id);
            if (!entity) {
                throw new AppError("RESOURCE_NOT_FOUND");
            }
            return entity;
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            console.error("Erro ao buscar entidade por ID no banco", err);
            throw new AppError("INTERNAL_SERVER_ERROR", { cause: err });
        }
    }

    // Cria uma nova entidade com validações rígidas de tipo (sem usar 'any')
    async create(entityData: Record<string, unknown>): Promise<IEntity> {
        if (!entityData || typeof entityData !== "object") {
            throw new AppError("VALIDATION_ERROR");
        }

        const {
            name,
            location,
            neighborhood,
            targetAudience,
            description,
            campaignContribution,
            photos,
            contactInfo,
            isActive
        } = entityData;

        // Validações estritas de campos obrigatórios
        if (
            typeof name !== "string" || name.trim() === "" ||
            typeof location !== "string" || location.trim() === "" ||
            typeof neighborhood !== "string" || neighborhood.trim() === "" ||
            typeof targetAudience !== "string" || targetAudience.trim() === "" ||
            typeof description !== "string" || description.trim() === "" ||
            typeof campaignContribution !== "string" || campaignContribution.trim() === "" 
        ) {
            throw new AppError("VALIDATION_ERROR");
        }

        // Validação opcional de photos (deve ser array de strings se enviado)
        let validatedPhotos: string[] = [];
        if (photos !== undefined) {
            if (!Array.isArray(photos) || !photos.every((p) => typeof p === "string")) {
                throw new AppError("VALIDATION_ERROR");
            }
            validatedPhotos = photos;
        }

        // Validação opcional de contactInfo
        let validatedContactInfo: { phone?: string; socialMedia?: string } = {};
        if (contactInfo !== undefined && contactInfo !== null) {
            if (typeof contactInfo !== "object") {
                throw new AppError("VALIDATION_ERROR");
            }
            const info = contactInfo as Record<string, unknown>;
            if (info.phone !== undefined && typeof info.phone !== "string") {
                throw new AppError("VALIDATION_ERROR");
            }
            if (info.socialMedia !== undefined && typeof info.socialMedia !== "string") {
                throw new AppError("VALIDATION_ERROR");
            }
            validatedContactInfo = {
                ...(info.phone && { phone: String(info.phone) }),
                ...(info.socialMedia && { socialMedia: String(info.socialMedia) })
            };
        }

        if (isActive !== undefined && typeof isActive !== "boolean") {
            throw new AppError("VALIDATION_ERROR");
        }

        const validatedIsActive = isActive ?? true;

        const newEntityData: Omit<IEntity, "_id"> = {
            name: name.trim(),
            location: location.trim(),
            neighborhood: neighborhood.trim(),
            targetAudience: targetAudience.trim(),
            description: description.trim(),
            campaignContribution: campaignContribution.trim(),
            photos: validatedPhotos,
            contactInfo: validatedContactInfo,
            isActive: validatedIsActive,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        try {
            return await this.entityRepository.insertEntity(newEntityData);
        } catch (err: unknown) {
            console.error("Erro ao cadastrar entidade no banco", err);
            throw new AppError("INTERNAL_SERVER_ERROR", { cause: err });
        }
    }

    // Atualiza com whitelist de campos e validações controladas
    async update(id: string, entityData: Record<string, unknown>): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            throw new AppError("VALIDATION_ERROR");
        }

        if (!entityData || typeof entityData !== "object") {
            throw new AppError("VALIDATION_ERROR");
        }

        const updatePayload: Partial<IEntity> = {};

        const textFields = ["name", "location", "neighborhood", "targetAudience", "description", "campaignContribution"] as const;
        
        for (const field of textFields) {
            if (entityData[field] !== undefined) {
                const val = entityData[field];
                if (typeof val !== "string" || val.trim() === "") {
                    throw new AppError("VALIDATION_ERROR");
                }
                updatePayload[field] = val.trim();
            }
        }

        if (entityData.photos !== undefined) {
            if (!Array.isArray(entityData.photos) || !entityData.photos.every((p) => typeof p === "string")) {
                throw new AppError("VALIDATION_ERROR");
            }
            updatePayload.photos = entityData.photos;
        }

        if (entityData.contactInfo !== undefined && entityData.contactInfo !== null) {
            if (typeof entityData.contactInfo !== "object") {
                throw new AppError("VALIDATION_ERROR");
            }
            const info = entityData.contactInfo as Record<string, unknown>;
            
            const contactPayload: { phone?: string; socialMedia?: string } = {
                ...(typeof info.phone === "string" && info.phone.trim() !== "" && { phone: info.phone.trim() }),
                ...(typeof info.socialMedia === "string" && info.socialMedia.trim() !== "" && { socialMedia: info.socialMedia.trim() })
            };

            if (Object.keys(contactPayload).length > 0) {
                updatePayload.contactInfo = contactPayload;
            }
        }

        if (entityData.isActive !== undefined) {
            if (typeof entityData.isActive !== "boolean") {
                throw new AppError("VALIDATION_ERROR");
            }

            updatePayload.isActive = entityData.isActive;
        }

        if (Object.keys(updatePayload).length === 0) {
            throw new AppError("VALIDATION_ERROR");
        }
        
        updatePayload.updatedAt = new Date();

        try {
            const updated = await this.entityRepository.updateEntity(id, updatePayload);
            if (!updated) {
                throw new AppError("RESOURCE_NOT_FOUND");
            }
            return true;
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            console.error("Erro ao atualizar entidade no banco", err);
            throw new AppError("INTERNAL_SERVER_ERROR", { cause: err });
        }
    }

    // Remove uma entidade do registro
    async delete(id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            throw new AppError("VALIDATION_ERROR");
        }

        try {
            const deleted = await this.entityRepository.deleteEntity(id);
            if (!deleted) {
                throw new AppError("RESOURCE_NOT_FOUND");
            }
            return true;
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            console.error("Erro ao remover entidade no banco", err);
            throw new AppError("INTERNAL_SERVER_ERROR", { cause: err });
        }
    }
}