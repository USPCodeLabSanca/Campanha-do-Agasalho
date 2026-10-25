import { Collection, ObjectId, type InsertOneResult } from "mongodb";
import type { IUser } from "../interfaces/IUser.js";

// Classe de manipulação da coleção User
export class UserRepository {
    // Possui como atributo privado a coleção User
    constructor(private userCollection: Collection<IUser>) {}

    // Métodos do repository da coleção User
    async selectUser(username: string): Promise<IUser|null> {
        return await this.userCollection.findOne({ username: username });
    }

    async insertUser(username: string, password: string): Promise<InsertOneResult<IUser>> {
        return await this.userCollection.insertOne({ _id: username, username: username, password: password });
    }
}