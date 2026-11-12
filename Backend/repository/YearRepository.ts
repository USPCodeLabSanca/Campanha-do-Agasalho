import { Collection, ObjectId } from "mongodb";
import type { IYear } from "../interfaces/IYear.js";

// Classe de manipulação da coleção Year
export class YearRepository {
    // Possui como atributo privado a coleção Year
    constructor(private yearCollection: Collection<IYear>) {}

    // Retorna todos os anos cadastrados no histórico
    async selectAllYears(): Promise<IYear[]> {
        return await this.yearCollection.find().toArray();
    }

    // Busca um registro pelo número do ano 
    async selectYearByNumber(year: number): Promise<IYear | null> {
        return await this.yearCollection.findOne({ year: year });
    }

    // Cadastra um novo registro de ano no banco
    async insertYear(yearData: Omit<IYear, "_id">): Promise<IYear> {
        const result = await this.yearCollection.insertOne(yearData as IYear);
        return {
            _id: result.insertedId,
            ...yearData
        };
    }

    // Atualiza as métricas de um ano pelo ID do documento
    async updateYear(id: string, yearData: Partial<IYear>): Promise<boolean> {
        const result = await this.yearCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: yearData }
        );
        return result.modifiedCount > 0;
    }

    // Remove um ano do histórico pelo ID do documento
    async deleteYear(id: string): Promise<boolean> {
        const result = await this.yearCollection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }
}