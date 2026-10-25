import { Router } from "express"
import { UserController } from "../controllers/UserController.js";
import jwt from "jsonwebtoken";

// Cria um objeto de roteamento para os endpoints dos dados de usuário
export function createUserRouter(userController: UserController): Router {
    // Declaração do objeto de roteamento
    const router = Router();

    // Vínculo da controller com os endpoints
    router.post("/login", (req, res) => userController.login(req, res));
    router.post("/register", (req, res) => userController.register(req, res));
    /* ^^ Caso haja necessidade de mais endpoints, colocar aqui ^^ */
    // Ex:
    // router.post("/test", (req, res) => testController.test(req, res));

    return router; 
}