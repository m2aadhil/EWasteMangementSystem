import { BaseModel } from "../base.model";

export class WasteReward extends BaseModel {
    _id: string;
    RewardName: string;
    Description: string;
    RewardType: string;
    Givenby: string;
    Ownedby: string;
    Assignedto: string;
    RewardDate: Date;
    ExpiryDate: Date;
    IsActive: boolean;
}