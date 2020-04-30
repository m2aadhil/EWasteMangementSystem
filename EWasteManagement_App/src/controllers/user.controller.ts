import { UserService } from "../services/user.service";
import { Request, Response } from "express";

const userService: UserService = new UserService();

export const createContributor = async (req: Request, res: Response) => {
    res.json(await userService.createUser(req.params.type, req.body));
}

export const loginContributor = async (req: Request, res: Response) => {
    if (req.params.type) {
        res.json(await userService.loginUser(req.params.type, req.params.login, req.params.password));
    } else {
        res.json("Incorrect User Type");
    }
}