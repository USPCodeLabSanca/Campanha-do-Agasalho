import { UserRepository } from "../repository/UserRepository.js";
import type { ILoginServiceResponse } from "../interfaces/ILoginServiceResponse.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ErrorCode } from "../constants/ErrorCode.js";

// Classe do service da coleção User
export class UserService {
    // Possui como atributo privado um objeto do tipo UserRepository
    constructor(private userRepository: UserRepository) {}
    
    // Métodos do service da coleção User
    async login(username: string, password: string): Promise<ILoginServiceResponse> {
        const user = await this.userRepository.selectUser(username);
        
        const error = {  
            code: ErrorCode.INVALID_CREDENTIALS,
            message: "Invalid username or password",
            status: 401
        }

        if(!user) {
            throw new Error("Invalid credentials", { cause: error });
        }

        const compare = await bcrypt.compare(password, user.password);

        if(!compare) {
            throw new Error("Invalid credentials", { cause: error });
        }

        const token = jwt.sign({ username: username }, process.env.JWT_SECRET!);

        return {
            token: token,
            username: username
        };
    }
}