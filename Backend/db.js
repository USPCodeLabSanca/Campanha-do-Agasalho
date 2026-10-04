import "dotenv/config"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export let db;
export let userCollection;

export async function connectDb() {
    console.log("Conectando ao MongoDB...");
    await client.connect();

    db = client.db();

    userCollection = db.collection('user');

    console.log('Banco de dados e coleções inicializados com sucesso!');
    return db;
}