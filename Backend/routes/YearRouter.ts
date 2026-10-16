import { Router } from "express";
import { YearController } from "../controllers/YearController.js";

export function createYearRouter(yearController: YearController): Router {
    // Declaração do objeto de roteamento
    const router = Router();

    // Vínculo da controller com os endpoints
    router.get("/", (req, res) => yearController.getAll(req, res));
    router.get("/:year", (req, res) => yearController.getByYear(req, res));
    router.post("/", (req, res) => yearController.create(req, res));
    router.put("/:id", (req, res) => yearController.update(req, res));
    router.delete("/:id", (req, res) => yearController.delete(req, res));

    return router;
}