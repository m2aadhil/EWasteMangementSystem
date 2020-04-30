import { BaseModel } from "../base.model";

export class CompanyUser extends BaseModel {
    _id: string;
    LoginName: string;
    CompanyName: string;
    BusinessRegNo: string;
    Email: string;
    TelephoneNo: string;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    Password: string;
}