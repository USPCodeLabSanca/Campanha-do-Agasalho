import "dotenv/config"
import express from "express"
import { connectDb } from "./db.js"
import { userCollection } from "./db.js"
import { UserRepository } from "./repository/UserRepository.js"
import { UserService } from "./services/UserService.js"
import { UserController } from "./controllers/UserController.js"
import { createUserRouter } from "./routes/UserRouter.js"

const app = express();
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 3000;

async function initServer(): Promise<void> {
    try {
        await connectDb();

        const userRepository = new UserRepository(userCollection);
        const userService = new UserService(userRepository);
        const userController = new UserController(userService);

        

        app.use("/user", createUserRouter(userController));

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });
    } catch (erro) {
        console.error("Falha ao conectar no banco de dados", erro);
    }
}

initServer();