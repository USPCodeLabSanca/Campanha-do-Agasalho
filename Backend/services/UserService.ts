import { UserRepository } from "../repository/UserRepository.js";

// Classe do service da coleção User
export class UserService {
    // Possui como atributo privado um objeto do tipo UserRepository
    constructor(private userRepository: UserRepository) {}
    
    // Métodos do service da coleção User
    async login(username: string, password: string): Promise<Boolean> {
        console.log(username);
        try {
            const user = await this.userRepository.selectUser(username);
            
            console.log("Usuário retornado do banco:", user);
            
            if(!user) {
                console.log("Usuário inexistente");
                return false;
            }

            if(user.password === password) {
                return true;
            }

            console.log("Senha incorreta");
            return false;
        } catch(err) {
            console.log("Erro no banco de dados");
            return false;
        }
    }
}