import { Router } from "express";
import { EntityController } from "../controllers/EntityController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

export function createEntityRouter(entityController: EntityController): Router {
    // Declaração do objeto de roteamento
    const router = Router();

    // Vínculo da controller com os endpoints
    router.get("/", (req, res) => entityController.getAll(req, res));
    router.get("/:id", (req, res) => entityController.getById(req, res));
    router.post("/", authMiddleware, (req, res) => entityController.create(req, res));
    router.put("/:id", authMiddleware, (req, res) => entityController.update(req, res));
    router.delete("/:id", authMiddleware, (req, res) => entityController.delete(req, res));

    return router;
}