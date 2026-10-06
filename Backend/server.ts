import "dotenv/config"
import express from "express"
import { connectDb, userCollection } from "./db.js"

// Repositorys
import { UserRepository } from "./repository/UserRepository.js"

// Services
import { UserService } from "./services/UserService.js"

// Controllers
import { UserController } from "./controllers/UserController.js"

// Routers
import { createUserRouter } from "./routes/UserRouter.js"

// Declaração do objeto de roteamento
const app = express();
app.use(express.json());

// Definição da porta do servidor
const PORT: number = Number(process.env.PORT) || 3000;

async function initServer(): Promise<void> {
    try {
        // Conexão ao banco de dados
        await connectDb();

        // Declaração dos objetos das camadas
        const userRepository = new UserRepository(userCollection);
        const userService = new UserService(userRepository);
        const userController = new UserController(userService);
        /* ^^ Caso haja necessidade de mais categorias, colocar aqui ^^ */
        // Ex:
        // const testRepository = db.collection<ITeste>('test')
        // const testService = db.collection<ITeste>('test')
        // const testA = db.collection<ITeste>('test')

        app.use("/user", createUserRouter(userController));
        /* ^^ Caso haja necessidade de mais rotas, colocar aqui ^^ */
        // Ex:
        // app.use("/test", createTestRouter(testController));

        // Abertura do servidor para recebimento de requisições
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });
    } catch (erro) {
        console.error("Falha ao conectar no banco de dados", erro);
    }
}

initServer();