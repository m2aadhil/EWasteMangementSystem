import { Request, Response } from "express";
import { MLService } from "../services/ml.service";
import { DBService } from "../services/database.service";
import { CityService } from "../services/city.service";

export const getInit = (req: Request, res: Response) => {
    res.json({ res: true });
}

export const train = async (req: Request, res: Response) => {
    console.log(req.params);
    let mlService: MLService = new MLService();
    let dbService: DBService = new DBService();
    let price = await mlService.executeTrainin(req.params.location, Number(req.params.epochs), req.params.type, Number(req.params.learningr));
    let values: any[] = await mlService.getOrigianlPrices();
    let predictions: any[] = [];
    let step1 = await mlService.predictStep(req.params.type);
    let step2 = await mlService.predictStep(req.params.type);
    let step3 = await mlService.predictStep(req.params.type);
    predictions.push(price); predictions.push(step1); predictions.push(step2); predictions.push(step3);
    if (req.params.type == 'state') {
        await dbService.addStateValues(req.params.location, predictions)
    } else {
        await dbService.addCountyValues(req.params.location, predictions)
    }
    res.json({ original: values, prediction: predictions });
}

export const trainAll = () => {
    let mlService: MLService = new MLService();
    mlService.trainAll();
}

export const getPriceforLocation = async (req: Request, res: Response) => {
    let cityService: CityService = new CityService();
    let response = await cityService.getPriceLocation(req.params.address, req.params.lat, req.params.lng, req.params.year, req.params.citycode);
    res.json({ price: response });
}

export const getCities = async (req: Request, res: Response) => {
    let cityService: CityService = new CityService();
    let response = await cityService.getCitiesofCounty(req.params.county)
    res.json(response);
}


