import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../services/https.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {


  loginForm;
  isInvalid: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private _router: Router) {

    this.loginForm = this.formBuilder.group({
      userName: "",
      password: ""
    })
  }

  ngOnInit() {
  }

  onSubmit(userData) {
    this.isInvalid = false;
    if (userData.userName == 'admin' && userData.password == 'admin') {
      this._router.navigateByUrl("home");
    } else {
      this.isInvalid = true;
    }
  }

}
