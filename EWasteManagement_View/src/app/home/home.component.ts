import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/https.service';
import { CommonService } from '../services/common.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  activeTab: string = 'Requests';
  ngOnInit() {
  }


  constructor(private httpService: HttpService, private _router: Router,
  ) {


  }

}
