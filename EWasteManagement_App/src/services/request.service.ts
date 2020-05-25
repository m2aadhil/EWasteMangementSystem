import { DBManager } from "../database/database.manager";
import { WasteRequest } from "../database/tables/requests/request";
import { UserService } from "./user.service";
import { RequestStatus } from "../models/constants";
import { request } from "express";
import { WasteReward } from "../database/tables/rewards/reward";

export class RequestService {

    private readonly dbManager: DBManager = new DBManager();
    private readonly userService: UserService = new UserService();

    constructor() { }

    createRequest = async (loginName: string, request: WasteRequest) => {
        let response = { User: loginName, Status: "fail" };
        try {
            let user = await this.userService.getUser('contributor', loginName);
            if (user) {
                await this.dbManager.connect();
                request.CreatedDate = new Date();
                request.CreatedBy = user.LoginName;
                request.IsActive = true;
                request.RequestDate = new Date();
                request.Raisedby = user.LoginName;
                request.RequestStatus = RequestStatus[0].id;
                await this.dbManager.insertDocument('db.requests', request);
                response.Status = "success";
            } else {
                response.Status = "invalid user";
            }

        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return response;
    }

    getRequestsByContributor = async (loginName: string) => {
        let requests: WasteRequest[] = [];
        try {
            let user = await this.userService.getUser('contributor', loginName);
            if (user) {
                await this.dbManager.connect();
                requests = await this.dbManager.getDocumentsFiltered('db.requests', { Raisedby: user.LoginName },
                    { _id: 1, RequestStatus: 1, WasteType: 1, Description: 1, Quantity: 1, Comapny_id: 1, });
                if (requests && requests.length > 0) {
                    requests.forEach(i => {
                        i["Status"] = RequestStatus.find(t => t.id == i.RequestStatus).status;
                    })
                }
            }

        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return { result: requests };
    }

    getRequestsByDistributor = async (loginName: string) => {
        let requests: WasteRequest[] = [];
        try {
            let user = await this.userService.getUser('distributor', loginName);
            if (user) {
                await this.dbManager.connect();
                requests = await this.dbManager.getDocumentsFiltered('db.requests', { Assignedto: user.LoginName },
                    { _id: 1, RequestStatus: 1, WasteType: 1, Description: 1, Quantity: 1, Comapny_id: 1, });
                if (requests && requests.length > 0) {
                    requests.forEach(i => {
                        i["Status"] = RequestStatus.find(t => t.id == i.RequestStatus).status;
                    })
                }
            }

        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return { result: requests };
    }

    updateRequest = async (loginName: string, id: string, request: WasteRequest) => {
        let response = { User: loginName, Status: "fail" };
        console.log(id);
        try {
            await this.dbManager.connect();
            let requests = await this.dbManager.getDocumentsById('db.requests', id);
            console.log(requests)
            if (requests && requests.length > 0) {
                if (request['Status']) {
                    request.RequestStatus = RequestStatus.find(i => i.status == request['Status']).id;
                }
                request.ModifiedDate = new Date();
                request.ModifiedBy = loginName;
                this.dbManager.updateDocumentsById('db.requests', id, request)
                response.Status = 'success';
            } else {
                response.Status = 'not found';
            }

        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return { result: response };
    }

    getRequestsById = async (id: string) => {
        let requests: WasteRequest[] = [];
        let userService: UserService = new UserService();
        try {
            console.log(id)
            await this.dbManager.connect();
            requests = await this.dbManager.getDocumentsById('db.requests', id);
            if (requests && requests.length > 0) {
                let createdUser = await userService.getUser('contributor', requests[0].Raisedby);
                let company = await this.dbManager.getDocumentsById('db.recycle_company', requests[0].Company_id.toString());
                console.log(company);
                requests.forEach(i => {
                    i["Status"] = RequestStatus.find(t => t.id == i.RequestStatus).status;
                    i["ContributorMobileNo"] = createdUser ? createdUser.MobileNo : null;
                    i["CompanyName"] = company && company.length > 0 ? company[0].CompanyName : null;
                    i["Contributor"] = createdUser ? createdUser : null;
                })
            }

        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return { result: requests };
    }

    getRequestsByCompany = async (loginName: string, status: number) => {
        let requests: WasteRequest[] = [];
        try {
            let user = await this.userService.getUser('company', loginName);
            if (user) {
                await this.dbManager.connect();
                console.log(user._id);
                requests = await this.dbManager.getDocumentsFiltered('db.requests', { Company_id: user._id.toString(), RequestStatus: status },
                    { _id: 1, RequestStatus: 1, WasteType: 1, Description: 1, Quantity: 1, Comapny_id: 1, });
                console.log(requests);
                if (requests && requests.length > 0) {
                    requests.forEach(i => {
                        i["Status"] = RequestStatus.find(t => t.id == i.RequestStatus).status;
                    })
                }
            }

        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return { result: requests };
    }

    assigenToDistributor = async (assignedBy: string, requestId: string, assignedTo: string) => {
        let response = { Success: false, ResponseMessage: "" }
        try {
            await this.dbManager.connect();
            let requests = await this.dbManager.getDocumentsById('db.requests', requestId);
            if (requests && requests.length > 0) {
                let assignRequest: WasteRequest = new WasteRequest();
                assignRequest.ModifiedBy = assignedBy;
                assignRequest.ModifiedDate = new Date();
                assignRequest.Assignedto = assignedTo;
                assignRequest.RequestStatus = 3;
                await this.dbManager.updateDocumentsById('db.requests', requestId, assignRequest);
                response.Success = true;
                response.ResponseMessage = "Assign Successfull";

            } else {
                response.ResponseMessage = "Request not found...";
            }
        } catch (err) {
            console.error(err);
            response.ResponseMessage = "Assigning Failed...";
        }
        return response;
    }

    getRewards = async(id:string) =>{
        let response;
        try {
            await this.dbManager.connect();
            response = await this.dbManager.getDocuments('db.rewards', {Givenby: id, Ownedby: ''});
            //response = await this.dbManager.getAllDocuments('db.rewards');
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {

        }
        return response;
    }

    getRewardHistory = async(companyId:string) =>{
        let response;
        try {
            await this.dbManager.connect();
            response = await this.dbManager.getDocuments('db.rewards', {Assignedto: companyId});
            //response = await this.dbManager.getAllDocuments('db.rewards');
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {

        }
        return response;
    }

    asignedRewards = async(rewardId:string, contributorId:string, companyId:string) =>{
        let response;
        try {
            await this.dbManager.connect();
            let reward:WasteReward = (await this.dbManager.getDocumentsById('db.rewards', rewardId))[0];
            reward.Assignedto = companyId;
            reward.Ownedby = contributorId;
            await this.dbManager.insertDocument('db.rewards', reward);
        } catch (e) {
            console.error(e);
        } finally {

        }
        return response;
    }

    updateRequestStaus = async (login: string, requestId: string, status: number) => {
        let response = { Success: false, NewRequestStatus: "" }
        try {
            await this.dbManager.connect();
            let requests = await this.dbManager.getDocumentsById('db.requests', requestId);
            if (requests && requests.length > 0) {
                let assignRequest: WasteRequest = new WasteRequest();
                assignRequest.ModifiedBy = login;
                assignRequest.ModifiedDate = new Date();
                assignRequest.RequestStatus = status;
                await this.dbManager.updateDocumentsById('db.requests', requestId, assignRequest);
                response.Success = true;
                response.NewRequestStatus = RequestStatus.find(i => i.id == status).status;

            } else {
                response.NewRequestStatus = "Request not found";
            }
        } catch (err) {
            console.error(err);
            response.NewRequestStatus = "Status Change Failed";
        }
        return response;
    }

}