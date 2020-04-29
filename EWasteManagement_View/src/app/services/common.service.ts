import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonService {

    private coreServiceUrl: string = "https://qriomatrix-kafe.herokuapp.com/";


    // private userSource = new BehaviorSubject(new UserDTO());
    // currentUser = this.userSource.asObservable();

    public GetCoreServiceUrl(): string {
        return this.coreServiceUrl;
    }

    // public setUser(user : UserDTO): void{
    //     this.userSource.next(user);
    // }

}