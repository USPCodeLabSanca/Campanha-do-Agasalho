import { MongoClient, Collection, Db } from "mongodb"
import type { IUser } from "./interfaces/IUser.js"
import type { IYear } from "./interfaces/IYear.js";
import type { IEntity } from "./interfaces/IEntity.js";

const uri: string = process.env.MONGODB_URI || "";
if (!uri) {
    throw new Error("A variável de ambiente MONGODB_URI não foi definida.");
}
const client = new MongoClient(uri);

// Declaração das collections
export let userCollection: Collection<IUser>;
export let yearCollection: Collection<IYear>
export let entityCollection: Collection<IEntity>
/* ^^ Caso haja necessidade de mais tabelas/collection, colocar aqui ^^ */
// Ex:
// export let testCollection: Collection<ITeste>;

export async function connectDb(): Promise<Db> {
    console.log("Conectando ao MongoDB...");

    // Conexão com o cluster
    await client.connect();

    // Determinando o banco de dados a ser manipulado
    const db: Db = client.db("campanha-do-agasalho");

    // Extração das collections do banco de dados
    userCollection = db.collection<IUser>("user");
    yearCollection = db.collection<IYear>("year");
    entityCollection = db.collection<IEntity>("entity");
    /* ^^ Caso haja necessidade de mais tabelas/collection, colocar aqui ^^ */
    // Ex:
    // testCollection = db.collection<ITeste>('test')

    console.log('Banco de dados e coleções inicializados com sucesso!');
    return db;
}