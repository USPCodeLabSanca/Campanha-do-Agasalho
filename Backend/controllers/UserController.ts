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

            console.log(body);

            const user = await this.userService.login(username, password);
            
            if(!user) {
                return res.status(400).json({ mensagem: "Erro" });
            }

            return res.status(200).json({ mensagem: "Deu bom" });
        } catch(err) {
            return res.status(400).json({ mensagem: "Deu ruim" });
        }
    }
}