import "dotenv/config"
import express from "express"
import type { Server } from "node:http"
import { connectDb, entityCollection, collectCollection, productCollection, userCollection, yearCollection } from "./db.js"

// Repositorys
import { UserRepository } from "./repository/UserRepository.js"
import { YearRepository } from "./repository/YearRepository.js"
import { EntityRepository } from "./repository/EntityRepository.js"
import { ProductRepository } from "./repository/ProductRepository.js"
import { CollectRepository } from "./repository/CollectRepository.js"

// Services
import { UserService } from "./services/UserService.js"
import { YearService } from "./services/YearService.js"
import { EntityService } from "./services/EntityService.js"
import { ProductService } from "./services/ProductService.js"
import { CollectService } from "./services/CollectService.js"

// Controllers
import { UserController } from "./controllers/UserController.js"
import { YearController } from "./controllers/YearController.js"
import { EntityController } from "./controllers/EntityController.js"
import { ProductController } from "./controllers/ProductController.js"
import { CollectController } from "./controllers/CollectController.js"

// Routers
import { createUserRouter } from "./routes/UserRouter.js"
import { createYearRouter } from "./routes/YearRouter.js"
import { createEntityRouter } from "./routes/EntityRouter.js"
import { createProductRouter } from "./routes/ProductRouter.js"
import { createCollectRouter } from "./routes/CollectRouter.js"

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

        const yearRepository = new YearRepository(yearCollection);
        const yearService = new YearService(yearRepository);
        const yearController = new YearController(yearService);

        const entityRepository = new EntityRepository(entityCollection);
        const entityService = new EntityService(entityRepository);
        const entityController = new EntityController(entityService);

        const productRepository = new ProductRepository(productCollection);
        const productService = new ProductService(productRepository);
        const productController = new ProductController(productService);
      
        const collectRepository = new CollectRepository(collectCollection);
        const collectService = new CollectService(collectRepository);
        const collectController = new CollectController(collectService);
        /* ^^ Caso haja necessidade de mais categorias, colocar aqui ^^ */
        // Ex:
        // const testRepository = db.collection<ITeste>('test')
        // const testService = db.collection<ITeste>('test')
        // const testA = db.collection<ITeste>('test')

        app.use("/user", createUserRouter(userController));
        app.use("/year", createYearRouter(yearController));
        app.use("/entity", createEntityRouter(entityController));
        app.use("/product", createProductRouter(productController));
        app.use("/collect", createCollectRouter(collectController));
        /* ^^ Caso haja necessidade de mais rotas, colocar aqui ^^ */
        // Ex:
        // app.use("/test", createTestRouter(testController));

        // Abertura do servidor para recebimento de requisições
        const server: Server = app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });

        server.on("error", (erro: NodeJS.ErrnoException) => {
            console.error("Erro ao iniciar servidor HTTP:", erro);
            process.exit(1);
        });
        
    } catch (erro) {
        console.error("Falha ao conectar no banco de dados", erro);
        process.exit(1);
    }
}

initServer();