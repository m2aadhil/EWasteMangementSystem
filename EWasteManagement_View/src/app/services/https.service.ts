import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

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


        return this.http.get(dataUrl
            , httpOptions)
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

        return this.http.post(dataUrl
            , body, httpOptions)
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


        return this.http.get(dataUrl
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

        return this.http.post(dataUrl
            , body, httpOptions)
            .toPromise()
            .then((response: JSON) => response)
            .catch(this.handleError);
    }

    postFormData(dataUrl: string, body: any): Promise<any> {

        return this.http.post(dataUrl
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

        return this.http.delete(dataUrl
            , httpOptions)
            .toPromise()
            .catch(this.handleError);
    }



    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}