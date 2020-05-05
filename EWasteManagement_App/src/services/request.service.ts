import { DBManager } from "../database/database.manager";
import { WasteRequest } from "../database/tables/requests/request";
import { UserService } from "./user.service";
import { RequestStatus } from "../models/constants";
import { request } from "express";

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
        try {
            console.log(id)
            await this.dbManager.connect();
            requests = await this.dbManager.getDocumentsById('db.requests', id);
            console.log(request);
            if (requests && requests.length > 0) {
                requests.forEach(i => {
                    i["Status"] = RequestStatus.find(t => t.id == i.RequestStatus).status;
                })
            }

        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return { result: requests };
    }

    getRequestsByCompany = async (loginName: string) => {
        let requests: WasteRequest[] = [];
        try {
            let user = await this.userService.getUser('company', loginName);
            if (user) {
                await this.dbManager.connect();
                requests = await this.dbManager.getDocuments('db.requests', { Company_id: user._id });
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

}