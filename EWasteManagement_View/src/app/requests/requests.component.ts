import { Component, OnInit } from '@angular/core';
import { RequestModel } from '../models/requests.mode';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.less']
})
export class RequestsComponent implements OnInit {

  constructor() { }

  selected: RequestModel = new RequestModel();
  gridData: RequestModel[] = [];

  ngOnInit() {
    let m1 = new RequestModel();
    m1.cName = "Dilukshan Udayakumar";
    m1.cAddress = "Ratnapura";
    m1.cWaste = "Mobile";
    m1.cQty = 1;
    m1.cDate = new Date();
    m1.cContact = "0716475698";
    this.gridData.push(m1);

    let m2 = new RequestModel();
    m2.cName = "Udayakkumar Dilrukshan";
    m2.cAddress = "Kohuwala";
    m2.cWaste = "Mobile Charger";
    m2.cQty = 3;
    m2.cDate = new Date();
    m2.cContact = "0777564680";
    this.gridData.push(m2);
  }

  onSelectChange = async ($event) => {
    console.log($event);
    this.selected = this.gridData.find(x => x.cName == $event[0]);
  }

}
