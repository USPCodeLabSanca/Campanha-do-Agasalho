import { Collection, ObjectId } from "mongodb";
import type { IEntity } from "../interfaces/IEntity.js";

// Classe de manipulação da coleção Entity (Entidades Beneficiadas)
export class EntityRepository {
    // Possui como atributo privado a coleção Entity
    constructor(private entityCollection: Collection<IEntity>) {}

    // Retorna todas as entidades cadastradas
    async selectAllEntities(): Promise<IEntity[]> {
        return await this.entityCollection.find().toArray();
    }

    // Busca uma entidade específica pelo ID do documento
    async selectEntityById(id: string): Promise<IEntity | null> {
        return await this.entityCollection.findOne({ _id: new ObjectId(id) });
    }

    // Cadastra uma nova entidade no banco
    async insertEntity(entityData: Omit<IEntity, "_id">): Promise<IEntity> {
        const result = await this.entityCollection.insertOne(entityData as IEntity);
        return {
            _id: result.insertedId,
            ...entityData
        };
    }

    // Atualiza as informações de uma entidade pelo ID do documento
    async updateEntity(id: string, entityData: Partial<IEntity>): Promise<boolean> {
        const result = await this.entityCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: entityData }
        );
        return result.modifiedCount > 0;
    }

    // Remove uma entidade do banco pelo ID do documento
    async deleteEntity(id: string): Promise<boolean> {
        const result = await this.entityCollection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }
}