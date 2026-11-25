import { Router } from "express";
import type { CollectController } from "../controllers/CollectController.js";
// import { EntityController } from "../controllers/EntityController.js";
// import { authMiddleware } from "../middlewares/AuthMiddleware.js";

export function createCollectRouter(collectController: CollectController): Router {
    // Declaração do objeto de roteamento
    const router = Router();

    // Vínculo da controller com os endpoints
    router.get("/get", (req, res) => collectController.selectAllCollect(req, res));
    router.post("/create", (req, res) => collectController.insertCollect(req, res));
    router.delete("/delete", (req, res) => collectController.deleteCollect(req, res));
    router.put("/update", (req, res) => collectController.updateCollect(req, res));

    return router;
}