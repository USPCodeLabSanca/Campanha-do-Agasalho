import { Router } from "express"
import { UserController } from "../controllers/UserController.js";

export function createUserRouter(userController: UserController): Router {
    const router = Router();

    return router; 
}