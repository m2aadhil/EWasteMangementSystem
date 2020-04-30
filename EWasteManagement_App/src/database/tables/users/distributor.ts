import { BaseModel } from "../base.model";

export class EWasteDistributor extends BaseModel {
    _id: string;
    LoginName: string;
    FirstName: string;
    LastName: string;
    Email: string;
    MobileNo: string;
    Password: string;
    CompanyID: string;
}