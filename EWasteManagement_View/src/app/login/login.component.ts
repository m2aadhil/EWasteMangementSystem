import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../services/https.service';
import { async } from '@angular/core/testing';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {


  loginForm;
  isInvalid: boolean = false;
  isLoading: boolean = false;
  constructor(private formBuilder: FormBuilder, private httpSerive: HttpService, private commonService: CommonService,
    private _router: Router) {

    this.loginForm = this.formBuilder.group({
      userName: "",
      password: ""
    })
  }

  ngOnInit() {
  }

  onSubmit = async (userData) => {
    this.isInvalid = false;
    this.isLoading = true;
    let url: string = `api/login/company/${userData.userName}/${userData.password}`;

    this.httpSerive.getData(url).then(async (res) => {
      if (res && res.Status == 'success') {
        await this.setUserData(userData.userName);
        this._router.navigateByUrl("home");
      } else {
        this.isInvalid = true;
      }
      this.isLoading = false;
    }).catch(err => {
      console.error(err);
      this.isInvalid = true;
      this.isLoading = false;
    });
  }

  private setUserData = async (userName: string) => {
    let url: string = `api/get/company/${userName}`;

    await this.httpSerive.getData(url).then(res => {
      if (res) {
        this.commonService.setUser(res);
      }
    }).catch(err => {
      console.error(err);
    })


  }

}
