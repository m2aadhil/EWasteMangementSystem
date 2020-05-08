import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {


    constructor(private http: HttpClient) { }


    get(dataUrl: string): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic cXJpb21hdHJpeC1jbGllbnQ6cXJpb21hdHJpeC1zZWNyZXQ='
            })
        };


        return this.http.get(environment.coreServiceURL + dataUrl
        )
            .toPromise()
            .then((response: JSON) => response)
            .catch(this.handleError);
    }

    post(dataUrl: string, body: any): Promise<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic cXJpb21hdHJpeC1jbGllbnQ6cXJpb21hdHJpeC1zZWNyZXQ='
            })
        };

        return this.http.post(environment.coreServiceURL + dataUrl
            , body)
            .toPromise()
            .then((response: JSON) => response)
            .catch(this.handleError);
    }
    getData(dataUrl: string): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };


        return this.http.get(environment.coreServiceURL + dataUrl
            , httpOptions)
            .toPromise()
            .then((response: JSON) => response)
            .catch(this.handleError);
    }

    postData(dataUrl: string, body: any): Promise<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(environment.coreServiceURL + dataUrl
            , body, httpOptions)
            .toPromise()
            .then((response: JSON) => response)
            .catch(this.handleError);
    }

    postFormData(dataUrl: string, body: any): Promise<any> {

        return this.http.post(environment.coreServiceURL + dataUrl
            , body)
            .toPromise()
            .then((response: JSON) => response)
            .catch(this.handleError);
    }

    deleteData(dataUrl: string, body: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.delete(environment.coreServiceURL + dataUrl
            , httpOptions)
            .toPromise()
            .catch(this.handleError);
    }



    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}