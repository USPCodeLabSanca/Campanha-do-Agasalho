import { UserRepository } from "../repository/UserRepository.js";
import type { IUserServiceResponse } from "../interfaces/IUserServiceResponse.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { MongoServerError } from "mongodb";
import { AppError } from "../errors/AppError.js";

// Classe do service da coleção User
export class UserService {
    // Possui como atributo privado um objeto do tipo UserRepository
    constructor(private userRepository: UserRepository) {}
    
    // Métodos do service da coleção User
    async login(username: string, password: string): Promise<IUserServiceResponse> {
        const user = await this.userRepository.selectUser(username);

        if(!user) {
            throw new AppError("INVALID_CREDENTIALS");
        }
        
        const compare = await bcrypt.compare(password, user.password);
        
        if(!compare) {
            throw new AppError("INVALID_CREDENTIALS");
        }

        const token = jwt.sign({ username: username }, process.env.JWT_SECRET!);

        return {
            token: token,
            username: username
        };
    }

    async register(username: string, password: string): Promise<void> {
        const passwordHash = await bcrypt.hash(password, 10);

        try {
            const user = await this.userRepository.selectUser(username);

            if(user) {
                throw new AppError("RESOURCE_ALREADY_EXISTS");
            }

            await this.userRepository.insertUser(username, passwordHash);
        } catch(error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("INTERNAL_SERVER_ERROR");
        }
    }
}