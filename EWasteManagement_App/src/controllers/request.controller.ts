import { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { WasteRequest } from "../database/tables/requests/request";

const requestService: RequestService = new RequestService();

export const createRequest = async (req: Request, res: Response) => {
    let payload: WasteRequest = req.body;
    res.json(await requestService.createRequest(req.params.login, payload));
}

export const updateRequest = async (req: Request, res: Response) => {
    let payload: WasteRequest = req.body;
    res.json(await requestService.updateRequest(req.params.login, req.params.id, payload));
}

export const getRequestsByContributor = async (req: Request, res: Response) => {
    res.json(await requestService.getRequestsByContributor(req.params.login));
}

export const getRequestsByDistributor = async (req: Request, res: Response) => {
    res.json(await requestService.getRequestsByDistributor(req.params.login));
}

export const getRequestsByCompany = async (req: Request, res: Response) => {
    res.json(await requestService.getRequestsByCompany(req.params.login, Number(req.params.status)));
}

export const getRequestsById = async (req: Request, res: Response) => {
    res.json(await requestService.getRequestsById(req.params.id));
}

export const assignToDistributor = async (req: Request, res: Response) => {
    res.json(await requestService.assigenToDistributor(req.params.login, req.params.id, req.params.assignto));
}