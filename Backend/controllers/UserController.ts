import { UserService } from "../services/UserService.js"

export class UserController {
    constructor(private service: UserService) {}
}