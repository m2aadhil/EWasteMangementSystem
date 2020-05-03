import { BaseModel } from "../base.model";

export class WasteRequest extends BaseModel {
    _id: string;
    RequestDate: Date;
    RequestStatus: number;
    WasteType: string;
    Description: string;
    Quantity: number;
    Comapny_id: string;
    Images: string;
    Raisedby: string;
    Acceptedby: string;
    Assignedto: string;
}