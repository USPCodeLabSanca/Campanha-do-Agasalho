import { Router } from "express"
import { ProductController } from "../controllers/ProductController.js";

// Cria um objeto de roteamento para os endpoints dos dados de usuário
export function createProductRouter(productController: ProductController): Router {
    // Declaração do objeto de roteamento
    const router = Router();

    // Vínculo da controller com os endpoints
    router.get("/get", (req, res) => productController.selectAllProduct(req, res));
    router.post("/create", (req, res) => productController.insertProduct(req, res));
    router.delete("/delete", (req, res) => productController.deleteProduct(req, res));
    router.put("/update", (req, res) => productController.updateProduct(req, res));
    /* ^^ Caso haja necessidade de mais endpoints, colocar aqui ^^ */
    // Ex:
    // router.post("/test", (req, res) => testController.test(req, res));

    return router; 
}