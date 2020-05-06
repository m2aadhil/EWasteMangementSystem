import { EWasteContributor } from "../database/tables/users/contributor";
import { DBManager } from "../database/database.manager";
import { UserTypes } from "../models/constants";
import { enviorenment } from "../config";
import { CompanyRating } from "../database/tables/ratings/db.companyratings";

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

export class UserService {

    private readonly saltRounds: number = 10;
    private readonly dbManager: DBManager = new DBManager();

    constructor() {
    }


    createUser = async (type: string, user) => {
        let response = { User: user.LoginName, Status: "fail" };
        try {

            let collection = UserTypes.find(i => i.type == type).collection;
            if (collection && !this.hasWhiteSpace(user.LoginName)) {
                await this.dbManager.connect();
                user.Password = await this.encrypt(user.Password);
                user.CreatedDate = new Date();
                user.CreatedBy = user.LoginName;
                user.IsActive = true;
                let contributor = await this.getUser(type, user.LoginName);
                if (!contributor) {
                    await this.dbManager.insertDocument(collection, user);
                    response.Status = "success";
                } else {
                    response.Status = "duplicate";
                }
            }

        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return response;
    }

    updateUser = async (type: string, user) => {
        let response = { User: user.LoginName, Status: "fail" };
        try {
            let collection = UserTypes.find(i => i.type == type).collection;
            if (collection) {
                user.Password = await this.encrypt(user.Password);
                user.ModifiedDate = new Date();
                user.ModifiedBy = user.LoginName;
                await this.dbManager.connect();
                await this.dbManager.updateDocument(collection, { LoginName: user.LoginName }, user);
                response.Status = "success";
            }
        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return response;
    }

    getUser = async (type: string, loginName: string) => {
        let response;
        try {
            let collection = UserTypes.find(i => i.type == type).collection;
            if (collection) {
                await this.dbManager.connect();
                let doc = await this.dbManager.getDocuments(collection, { LoginName: loginName });
                if (doc && doc.length > 0) {
                    response = doc[0];
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return await response;
    }

    loginUser = async (type: string, loginName: string, password: string) => {
        let response = { User: loginName, Status: "fail" };
        try {
            let collection = UserTypes.find(i => i.type == type).collection;
            if (collection) {
                let query = await this.getUser(type, loginName);
                if (query) {
                    let user: EWasteContributor = query;
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

    getAllUsers = async (type: string) => {
        let response;
        try {
            let collection = UserTypes.find(i => i.type == type).collection;
            if (collection) {
                await this.dbManager.connect();
                response = await this.dbManager.getAllDocuments(collection);
                if (response && response.length > 0) {
                    let ratings;
                    if (type == 'company') {
                        ratings = await this.dbManager.getAllDocuments('db.comapny_rating');
                        response.forEach(e => {
                            let rating: number = 0;
                            let companyRatings = ratings.filter(i => i.Company_id == e._id);
                            if (companyRatings && companyRatings.length > 0) {
                                companyRatings.forEach(i => {
                                    rating += i.Rating;
                                });
                                rating = rating > 0 ? rating / companyRatings.length : 0;
                            }
                            delete e['Password'];
                            delete e['IsActive'];
                            delete e['LoginName'];
                            e['Rating'] = rating;
                        });

                    } else {
                        response.forEach(e => {
                            delete e['Password'];
                            delete e['IsActive'];
                            delete e['LoginName'];

                        });
                    }
                }

            }
        } catch (err) {
            console.error(err);
        } finally {
            //await this.dbManager.closeConnection();
        }
        return { result: response };
    }
    //db.comapny_rating
    resetPassword = async (type: string, loginName: string) => {
        let response = { User: loginName, Status: "fail", Message: '' };
        try {
            let query = await this.getUser(type, loginName);
            if (query) {
                let user: EWasteContributor = query;
                let resetPw: string = this.getRandomString(5);
                user.Password = resetPw;
                await this.updateUser(type, user);
                await this.sendResetPasswordEmail(user, resetPw);
                response.Status = 'success';
                response.Message = 'Please check your email..';
            }
        } catch (e) {
            console.error(e);
        } finally {

        }
        return response;

    }

    getCompanyRating = async (loginName: string, company_id: string) => {
        let response = { User: loginName, UserRating: null, OverAllRating: null };
        try {
            await this.dbManager.connect();
            let ratings: any[] = await this.dbManager.getDocuments('db.comapny_rating', { Company_id: company_id });
            if (ratings && ratings.length > 0) {
                let userRating = ratings.find(i => i.UserName == loginName);
                if (userRating) {
                    response.UserRating = userRating.Rating;
                }
                let total: number = 0;
                ratings.forEach(i => { total += i.Rating });
                response.OverAllRating = total / ratings.length;
            }
        } catch (e) {
            console.error(e);
        } finally {

        }
        return response;
    }

    addCompanyRating = async (loginName: string, company_id: string, rate: number) => {
        let response = "fail";
        try {
            let currentRating = await this.getCompanyRating(loginName, company_id);
            let rating: CompanyRating = new CompanyRating();
            rating.Company_id = company_id;
            rating.UserName = loginName;
            rating.Rating = rate;
            rating.IsActive = true;
            await this.dbManager.connect();
            if (currentRating.UserRating) {
                await this.dbManager.updateDocument('db.comapny_rating', { UserName: rating.UserName }, rating);
            } else {
                await this.dbManager.insertDocument('db.comapny_rating', rating);
            }
            response = "added";
        } catch (e) {
            console.error(e);
        } finally {

        }
        return response;
    }



    private sendResetPasswordEmail = async (user, resetString: string) => {
        let transporter = nodemailer.createTransport({
            service: enviorenment.Mail.service,
            auth: {
                user: enviorenment.Mail.address,
                pass: enviorenment.Mail.password
            }
        });

        let mailOptions = {
            from: enviorenment.Mail.address,
            to: user.Email,
            subject: 'Reset Password | E - Waste Management',
            text: `
            Dear ${user.LoginName},
            We have resetted you're password as requested. Please use ${resetString} as the new password for login.
            Thank You!
            `
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }


    private getRandomString(length: number) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private hasWhiteSpace(s): boolean {
        return /\s/g.test(s);
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