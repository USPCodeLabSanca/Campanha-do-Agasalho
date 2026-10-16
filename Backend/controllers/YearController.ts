import { YearService } from "../services/YearService.js";
import type { Request, Response } from "express";

export class YearController {
    constructor(private yearService: YearService) {}

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const years = await this.yearService.getAll();
            return res.status(200).json(years);
        } catch (err) {
            return res.status(500).json({ mensagem: "Erro interno ao buscar histórico de anos" });
        }
    }

    async getByYear(req: Request, res: Response): Promise<Response> {
        try {
            const { year } = req.params;
            if (!year || typeof year !== "string") {
                return res.status(400).json({ mensagem: "Parâmetro ano inválido" });
            }

            const yearData = await this.yearService.getByYear(year);

            if (!yearData) {
                return res.status(404).json({ mensagem: "Dados do ano não encontrados no histórico" });
            }

            return res.status(200).json(yearData);
        } catch (err: any) {
            if (err.message === "INVALID_YEAR_FORMAT" || err.message === "INVALID_YEAR_RANGE") {
                return res.status(400).json({ mensagem: "Formato ou faixa de ano inválida" });
            }
            return res.status(500).json({ mensagem: "Erro ao buscar dados do ano" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const newYear = await this.yearService.create(body);

            return res.status(201).json({ mensagem: "Ano cadastrado com sucesso", data: newYear });
        } catch (err: any) {
            switch (err.message) {
                case "INVALID_BODY":
                case "INVALID_YEAR":
                case "INVALID_TOTALCOLLECTED":
                case "INVALID_TOTALCOLLECTIONPOINTS":
                case "INVALID_TOTALBENEFICIARYENTITIES":
                case "INVALID_TOTAL_RAISED_MONEY":
                    return res.status(400).json({ mensagem: `Erro de validação: ${err.message}` });
                case "YEAR_ALREADY_EXISTS":
                    return res.status(409).json({ mensagem: "Já existe um registro cadastrado para este ano" });
                default:
                    return res.status(500).json({ mensagem: "Erro ao cadastrar novo ano" });
            }
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== "string") {
                return res.status(400).json({ mensagem: "ID do ano é obrigatório" });
            }

            const body = req.body;
            const updated = await this.yearService.update(id, body);

            if (!updated) {
                return res.status(404).json({ mensagem: "Ano não encontrado para atualização" });
            }

            return res.status(200).json({ mensagem: "Dados do ano atualizados com sucesso" });
        } catch (err: any) {
            if (err.message === "INVALID_ID") {
                return res.status(400).json({ mensagem: "Formato de ID inválido" });
            }
            if (err.message.startsWith("INVALID_")) {
                return res.status(400).json({ mensagem: `Erro de validação: ${err.message}` });
            }
            return res.status(500).json({ mensagem: "Erro ao atualizar dados do ano" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== "string") {
                return res.status(400).json({ mensagem: "ID do ano é obrigatório" });
            }

            const deleted = await this.yearService.delete(id);

            if (!deleted) {
                return res.status(404).json({ mensagem: "Ano não encontrado para remoção" });
            }

            return res.status(200).json({ mensagem: "Ano removido com sucesso" });
        } catch (err: any) {
            if (err.message === "INVALID_ID") {
                return res.status(400).json({ mensagem: "Formato de ID inválido" });
            }
            return res.status(500).json({ mensagem: "Erro ao remover ano" });
        }
    }
}