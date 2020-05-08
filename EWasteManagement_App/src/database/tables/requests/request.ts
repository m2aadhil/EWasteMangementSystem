import { BaseModel } from "../base.model";

export class WasteRequest extends BaseModel {
    _id: string;
    RequestDate: Date;
    RequestStatus: number;
    WasteType: string;
    Description: string;
    Quantity: number;
    Company_id: string;
    Images: string;
    Raisedby: string;
    Acceptedby: string;
    Assignedto: string;
    Longitude: string;
    Latitude: string;
}