import { UserService } from "../services/UserService.js"
import type { Request, Response } from "express"

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
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            });
        }
    }

    async register(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        const username = body.username;
        const password = body.password;
        
        try {
            await this.userService.register(username, password);

            return res.status(201).json({ message: "Successful register", data: { username } });
        } catch(err: any) {
            return res.status(err.status).json({
                code: err.code,
                message: err.message,
                status: err.status
            })
        }
    }
}