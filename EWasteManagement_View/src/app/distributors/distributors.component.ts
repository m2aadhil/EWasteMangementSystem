import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/https.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.less']
})
export class DistributorsComponent implements OnInit {

  public state: State = {
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    }
  };

  gridData: GridDataResult;
  distributors: any[] = [];
  isGridLoading: boolean = false;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getDistributors();
  }

  private getDistributors = async () => {
    this.isGridLoading = true;
    let url: string = `api/getall/distributor`;
    this.httpService.getData(url).then(res => {
      if (res) {
        console.log(res);
        this.distributors = res.result;
        this.gridData = process(this.distributors, this.state);
        this.isGridLoading = false;
      }
    }).catch(err => {
      console.error(err);
      this.isGridLoading = false;
    })
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.distributors, this.state);
  }
}
