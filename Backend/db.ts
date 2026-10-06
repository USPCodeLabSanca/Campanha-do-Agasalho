import "dotenv/config"
import { MongoClient, Collection, Db } from "mongodb"
import type { IUser } from "./interfaces/IUser.ts"

const uri: string = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

export let userCollection: Collection<IUser>;

export async function connectDb(): Promise<Db> {
    console.log("Conectando ao MongoDB...");
    await client.connect();

    const db: Db = client.db();

    userCollection = db.collection<IUser>('user');

    console.log('Banco de dados e coleções inicializados com sucesso!');
    return db;
}