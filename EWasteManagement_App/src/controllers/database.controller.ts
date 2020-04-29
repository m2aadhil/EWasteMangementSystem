import { Request, Response } from "express";
import { DBManager } from "../database/database.manager";
import { StateValues } from "../database/models/db.statevalues";
import { DBService } from "../services/database.service";
import { CountyValues } from "../database/models/dn.countyvalues";
import { APIService } from "../services/api.service";
import { CityService } from "../services/city.service";

export const testCSV = async () => {
    let service = new APIService();
    let dbService: DBService = new DBService();
    let result = await dbService.getCityCodes();
    let dbManager: DBManager = new DBManager();
    let cityService: CityService = new CityService();


    console.log(await cityService.getCitiesofCounty('Orange'));
    console.log(await cityService.getPricesCity('00042'));
    console.log(await cityService.getPriceLocation('5609 Coliseum St Los Angeles CA 90016', '34.018641', '-118.367429', '2018', '00042'))
    //await service.executeWalkScoreRequest('1119%8th%20Avenue%20Seattle%20WA%2098101', '47.6085', '-122.3295');
    // await dbManager.connect('land_evaluation');

    // for (let i = 0; i < result.length; i++) {
    //     let apiVal = await service.executeZillowRequest('C', Number(result[i].CityCode).toString(), 'MSPFAH');
    //     //await dbManager.updateDocument('db.citycodes', { CityCode: result[i].CityCode }, {CityName});
    //     if (apiVal) {
    //         let data: any[] = apiVal.dataset.data;
    //         if (data) {
    //             let soldPrices: any = {};
    //             for (let i = 2007; i < 2018; i++) {
    //                 let value = data.find(x => x[0] == i + '-06-30') ? data.find(x => x[0] == i + '-06-30')[1] : null;
    //                 if (value) {
    //                     soldPrices[(i + 1).toString()] = value;
    //                 }
    //             }
    //             await dbManager.updateDocument('db.citycodes', { CityCode: result[i].CityCode }, { MedianSoldPrice: soldPrices });
    //         }
    //     }
    // }

    //let res = await service.executeZillowRequest();
}

export const testDBConnection = async (req: Request, res: Response) => {
    let dbManager: DBManager = new DBManager();

    await dbManager.connect('land_evaluation');


    let doc = new StateValues();
    for (let i = 2008; i <= 2020; i++) {
        let ins: CountyValues = new CountyValues();
        ins.Year = i.toString();
        await dbManager.insertDocument('db.countyvalues', ins);

    }
    //await dbManager.updateDocument('db.statevalues', { Year: "2008" }, doc);
    res.json({ res: "success" });
}

export const getAllStateValues = async (req: Request, res: Response) => {
    let dbService: DBService = new DBService();

    let result = await dbService.getStateValuesAll()
    console.log(result);
    res.json(result.sort((x, y) => { return x.Year - y.Year }));
}

export const getAllCountyValues = async (req: Request, res: Response) => {
    let dbService: DBService = new DBService();

    let result = await dbService.getCountyValuesAll();
    console.log(result);
    res.json(result.sort((x, y) => { return x.Year - y.Year }));
}