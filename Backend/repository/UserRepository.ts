import { Collection } from "mongodb";
import type { IUser } from "../interfaces/IUser.js";


export class UserRepository {
    constructor(private collection: Collection<IUser>) {}

}