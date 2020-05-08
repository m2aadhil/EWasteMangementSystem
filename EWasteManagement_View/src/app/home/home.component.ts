import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/https.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UserModel } from '../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  activeTab: string = 'Requests';
  user: UserModel;
  ngOnInit() {

  }


  constructor(private httpService: HttpService, private _router: Router, private commonService: CommonService
  ) {
    this.user = this.commonService.getUser();

  }

}
