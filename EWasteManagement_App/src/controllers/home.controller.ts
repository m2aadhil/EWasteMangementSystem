import { Request, Response } from "express";


export const getInit = (req: Request, res: Response) => {
    res.json({ res: true });
}