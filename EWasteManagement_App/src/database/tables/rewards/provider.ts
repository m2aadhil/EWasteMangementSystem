import { BaseModel } from "../base.model";

export class RewardProvider extends BaseModel {
    _id: string;
    BusinessName: string;
    BusinessEmail: string;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
}