import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../services/https.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UserModel } from '../models/user.model';

declare var ocpu;
declare var $;

@Component({
  selector: 'app-forecast',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.less']
})
export class ForecastingComponent implements OnInit, AfterViewInit {

  ngOnInit() {
    console.log($);
  }


  constructor(private httpService: HttpService, private _router: Router, private commonService: CommonService
  ) {

  }
    ngAfterViewInit(): void {

    }

}
