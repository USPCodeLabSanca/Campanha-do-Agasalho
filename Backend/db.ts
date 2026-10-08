import "dotenv/config"
import { MongoClient, Collection, Db, ObjectId } from "mongodb"
import type { IUser } from "./interfaces/IUser.ts"

const uri: string = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

// Declaração das collections
export let userCollection: Collection<IUser>;
/* ^^ Caso haja necessidade de mais tabelas/collection, colocar aqui ^^ */
// Ex:
// export let testCollection: Collection<ITeste>;

export async function connectDb(): Promise<Db> {
    console.log("Conectando ao MongoDB...");

    // Conexão com o cluster
    await client.connect();

    // Determinando o banco de dados a ser manipulado
    const db: Db = client.db("teste");

    // Extração das collections do banco de dados
    userCollection = db.collection<IUser>("user");
    /* ^^ Caso haja necessidade de mais tabelas/collection, colocar aqui ^^ */
    // Ex:
    // testCollection = db.collection<ITeste>('test')

    console.log('Banco de dados e coleções inicializados com sucesso!');
    return db;
}