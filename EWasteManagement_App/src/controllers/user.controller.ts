import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { EWasteContributor } from "../database/tables/users/contributor";
import { EWasteDistributor } from "../database/tables/users/distributor";
import { CompanyUser } from "../database/tables/users/company";

const userService: UserService = new UserService();

export const createContributor = async (req: Request, res: Response) => {
    if (req.params.type == 'contributor') {
        let payload: EWasteContributor = req.body;
        res.json(await userService.createUser(req.params.type, payload));
    } else if (req.params.type == 'distributor') {
        let payload: EWasteDistributor = req.body;
        res.json(await userService.createUser(req.params.type, payload));
    } else if (req.params.type == 'company') {
        let payload: CompanyUser = req.body;
        res.json(await userService.createUser(req.params.type, payload));
    } else {
        res.json(await userService.createUser(req.params.type, req.body));
    }
}

export const loginContributor = async (req: Request, res: Response) => {
    if (req.params.type) {
        res.json(await userService.loginUser(req.params.type, req.params.login, req.params.password));
    } else {
        res.json("Incorrect User Type");
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    if (req.params.type) {
        res.json(await userService.getAllUsers(req.params.type));
    } else {
        res.json("Incorrect User Type");
    }
}

export const getUsers = async (req: Request, res: Response) => {
    if (req.params.type) {
        res.json(await userService.getUser(req.params.type, req.params.login));
    } else {
        res.json("Incorrect User Type");
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    res.json(await userService.resetPassword(req.params.type, req.params.login));
}

export const addCompanyRating = async (req: Request, res: Response) => {
    res.json(await userService.addCompanyRating(req.params.login, req.params.company, Number(req.params.rating)));
}

export const getCompanyRating = async (req: Request, res: Response) => {
    res.json(await userService.getCompanyRating(req.params.login, req.params.company));
}

export const getRewardProviders = async (req: Request, res: Response) => {
    res.json(await userService.getRewardProviders());
}