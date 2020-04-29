import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable()
export class AuthenticationService {

  constructor(public http: HttpClient, private commonService: CommonService) { }

  public login(userData: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic cXJpb21hdHJpeC1jbGllbnQ6cXJpb21hdHJpeC1zZWNyZXQ='
      })
    };

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        username: userData.username,
        password: userData.password
      }
    });



    return this.http.post("" + "oauth/token", params, httpOptions);
  }
}