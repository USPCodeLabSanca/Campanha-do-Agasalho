import "dotenv/config"
import express from "express"
import { connectDb } from "./db.js"
import publicRouter from "./routes/public.routes.js"
import privateRouter from "./routes/private.routes.js"

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function initServer() {
    try {
        await connectDb();

        app.use("/public", publicRouter);
        app.use("/private", privateRouter);

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });

    } catch (erro) {
        console.error("Falha ao conectar no banco de dados", erro);
    }
}

initServer();