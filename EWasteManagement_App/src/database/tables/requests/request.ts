import { BaseModel } from "../base.model";

export class WasteRequest extends BaseModel {
    _id: string;
    RequestDate: Date;
    RequestStatus: number;
    WasteType: string;
    Description: string;
    Quantity: number;
    Images: string;
    Raisedby: string;
    Acceptedby: string;
    Assignedto: string;
}