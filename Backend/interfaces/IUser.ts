import { ObjectId } from "mongodb"

// Interface dos elementos da coleção User
export interface IUser {
    _id: ObjectId;
    username: string;
    password: string;
}