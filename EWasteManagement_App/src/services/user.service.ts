import { EWasteContributor } from "../database/tables/users/contributor";
import { DBManager } from "../database/database.manager";
import { Hash } from "crypto";
import { UserTypes } from "../models/constants";

const bcrypt = require('bcrypt');

export class UserService {

    private readonly saltRounds: number = 10;
    private readonly dbManager: DBManager = new DBManager();

    constructor() {
    }


    createUser = async (type: string, user) => {
        let response = { User: user.LoginName, Status: "fail" };
        try {

            let collection = UserTypes.find(i => i.type == type).collection;
            if (collection) {
                await this.dbManager.connect();
                user.Password = await this.encrypt(user.Password);
                user.CreatedDate = new Date();
                user.CreatedBy = user.LoginName;
                let contributor = await this.getUser(type, user.LoginName);
                if (contributor && contributor.length == 0) {
                    await this.dbManager.insertDocument(collection, user);
                    response.Status = "success";
                } else {
                    response.Status = "duplicate";
                }
            }

        } catch (err) {
            console.error(err);
        } finally {
            await this.dbManager.closeConnection();
        }
        return response;
    }

    getUser = async (type: string, loginName: string) => {
        let response;
        try {
            let collection = UserTypes.find(i => i.type == type).collection;
            if (collection) {
                await this.dbManager.connect();
                response = await this.dbManager.getDocuments(collection, { LoginName: loginName });
            }
        } catch (err) {
            console.error(err);
        } finally {
            await this.dbManager.closeConnection();
        }
        return response;
    }

    loginUser = async (type: string, loginName: string, password: string) => {
        let response = { User: loginName, Status: "fail" };
        try {
            let collection = UserTypes.find(i => i.type == type).collection;
            if (collection) {
                let query = await this.getUser(type, loginName);
                if (query && query.length > 0) {
                    let user: EWasteContributor = query[0];
                    if (await this.compare(user.Password, password)) {
                        response.Status = "success";
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
        return response;
    }

    private encrypt = async (text: string) => {
        let hashedString: string = null;
        await bcrypt.hash(text, this.saltRounds).then((hash) => {
            if (hash) {
                hashedString = hash
            }
        });
        return hashedString;
    }

    private compare = async (hash: string, text: string) => {
        let match: boolean = false;
        await bcrypt.compare(text, hash).then((result) => {
            match = result;
        });
        return match;
    }
}