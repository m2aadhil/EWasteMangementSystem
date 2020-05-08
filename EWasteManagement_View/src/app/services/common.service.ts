import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable()
export class CommonService {

    private user: UserModel;

    constructor() {
        this.user = new UserModel();
    }

    setUser = (user: UserModel) => {
        this.user = user;
    }

    getUser = () => {
        return this.user;
    }

}