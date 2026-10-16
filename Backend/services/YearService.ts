import { YearRepository } from "../repository/YearRepository.js";
import type { IYear } from "../interfaces/IYear.js";
import { ObjectId } from "mongodb";

export class YearService {
    constructor(private yearRepository: YearRepository) {}

    // Retorna todos os anos cadastrados
    async getAll(): Promise<IYear[]> {
        try {
            return await this.yearRepository.selectAllYears();
        } catch (err) {
            console.error("Erro ao buscar histórico de anos no banco", err);
            throw new Error("DB_ERROR");
        }
    }

    // Busca um ano específico validando formato e faixa
    async getByYear(yearStr: string): Promise<IYear | null> {
        // Valida se a string contém apenas números inteiros positivos
        if (!/^\d+$/.test(yearStr)) {
            throw new Error("INVALID_YEAR_FORMAT");
        }

        const yearNum = Number(yearStr);
        if (!Number.isInteger(yearNum) || yearNum < 2000) {
            throw new Error("INVALID_YEAR_RANGE");
        }

        try {
            return await this.yearRepository.selectYearByNumber(yearNum);
        } catch (err) {
            console.error("Erro ao buscar ano no banco", err);
            throw new Error("DB_ERROR");
        }
    }

    // Cria um novo ano 
    async create(yearData: any): Promise<IYear> {
        if (!yearData || typeof yearData !== "object") {
            throw new Error("INVALID_BODY");
        }

        const { year, totalCollected, totalCollectionPoints, totalBeneficiaryEntities, totalRaisedMoney } = yearData;

        // Validação estrita do ano (deve ser inteiro e >= 2000)
        if (typeof year !== "number" || !Number.isInteger(year) || year < 2000) {
            throw new Error("INVALID_YEAR");
        }

        // Validação dos métricas de impacto (devem ser números finitos, inteiros e >= 0)
        const numericFields = { totalCollected, totalCollectionPoints, totalBeneficiaryEntities };
        for (const [key, val] of Object.entries(numericFields)) {
            if (typeof val !== "number" || !Number.isFinite(val) || !Number.isInteger(val) || val < 0) {
                throw new Error(`INVALID_${key.toUpperCase()}`);
            }
        }

        if (totalRaisedMoney !== undefined) {
            if (typeof totalRaisedMoney !== "number" || !Number.isFinite(totalRaisedMoney) || totalRaisedMoney < 0) {
                throw new Error("INVALID_TOTAL_RAISED_MONEY");
            }
        }

        // Verifica se o ano já existe no banco de dados (evita duplicidade)
        const existingYear = await this.yearRepository.selectYearByNumber(year);
        if (existingYear) {
            throw new Error("YEAR_ALREADY_EXISTS");
        }

        const newYearData: Omit<IYear, "_id"> = {
            year,
            totalCollected,
            totalCollectionPoints,
            totalBeneficiaryEntities,
            ...(totalRaisedMoney !== undefined && { totalRaisedMoney }),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.yearRepository.insertYear(newYearData);
    }

    // Atualiza com whitelist de campos e validações controladas
    async update(id: string, yearData: any): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            throw new Error("INVALID_ID");
        }

        if (!yearData || typeof yearData !== "object") {
            throw new Error("INVALID_BODY");
        }

        const updatePayload: Partial<IYear> = {};

        // Valida ano se enviado
        if (yearData.year !== undefined) {
            if (typeof yearData.year !== "number" || !Number.isInteger(yearData.year) || yearData.year < 2000) {
                throw new Error("INVALID_YEAR");
            }
            updatePayload.year = yearData.year;
        }

        // Valida métricas numéricas se enviadas
        const numericFields = ["totalCollected", "totalCollectionPoints", "totalBeneficiaryEntities", "totalRaisedMoney"];
        for (const field of numericFields) {
            if (yearData[field] !== undefined) {
                const val = yearData[field];
                if (typeof val !== "number" || !Number.isFinite(val) || val < 0) {
                    throw new Error(`INVALID_${field.toUpperCase()}`);
                }
                (updatePayload as any)[field] = val;
            }
        }

        // Impede sobrescrever createdAt ou injetar _id manualmente; atualiza updatedAt
        updatePayload.updatedAt = new Date();

        return await this.yearRepository.updateYear(id, updatePayload);
    }

    // Remove um registro do histórico
    async delete(id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            throw new Error("INVALID_ID");
        }

        return await this.yearRepository.deleteYear(id);
    }
}