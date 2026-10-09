import { UserService } from "../services/UserService.js"
import type { Request, Response } from "express"
import { ErrorCode } from "../constants/ErrorCode.js";

// Classe da controller da coleção User
export class UserController {
    // Possui como atributo privado o objeto do tipo UserService
    constructor(private userService: UserService) {};

    // Métodos da controller da coleção User
    async login(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const username = body.username;
            const password = body.password;

            const user = await this.userService.login(username, password);
            
            res.cookie("token", user.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "prod",
                sameSite: process.env.NODE_ENV === "prod" ? "strict" : "lax",
                maxAge: 24 * 60 * 60 * 1000
            })

            return res.status(200).json({ message: "Successful login", data: { username } });
        } catch(err: any) {
            console.error("[USER CONTROLLER]: ", err.cause.message);
            return res.status(err.cause.status).json({
                code: err.cause.code,
                message: err.message,
                status: err.cause.status
            });
        }
    }
}