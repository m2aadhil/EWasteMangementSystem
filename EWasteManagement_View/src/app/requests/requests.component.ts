import { Component, OnInit } from '@angular/core';
import { RequestModel } from '../models/requests.mode';
import { HttpService } from '../services/https.service';
import { CommonService } from '../services/common.service';
import { UserModel } from '../models/user.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.less']
})
export class RequestsComponent implements OnInit {

  constructor(private httpService: HttpService, private commonService: CommonService, private sanitizer: DomSanitizer) { }

  private user: UserModel;
  isLoading: boolean = false;
  isGridLoading: boolean = false;
  isContLoading: boolean = false;
  isAssign: boolean = false;
  imageUrl: SafeUrl;
  selectedRequest: RequestModel = new RequestModel();
  listDistributors: string[] = [];
  distributors: any[] = [];
  selectedDistributor: any = {};

  selectedReqId: string = "";
  contName: string = "";
  contAddress: string = "";
  contTel: string = "";
  contEmail: string = "";

  gridData: any[] = [];

  ngOnInit() {
    this.user = this.commonService.getUser();
    this.getPendingRequest();
    this.getDistributors();
  }

  onSelectChange = async ($event) => {
    console.log($event[0]);
    this.isContLoading = true;
    let url: string = `api/request/get/${$event[0]}`;
    this.httpService.getData(url).then(res => {
      if (res) {
        console.log(res);
        this.selectedRequest = res.result[0];
        this.setSelected(res.result[0].Contributor)

        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.selectedRequest.Images);
        this.isContLoading = false;
      }
    }).catch(err => {
      console.error(err);
      this.isContLoading = false;
    })
    //this.selected = this.gridData.find(x => x.cName == $event[0]);
  }

  setSelected = (user: any) => {
    this.contName = user.FirstName + ' ' + user.LastName;
    this.contAddress = `${user.AddressLine1 ? user.AddressLine1 : ''} ${user.AddressLine2 ? user.AddressLine2 : ''} ${user.City ? user.City : ''}`;
    this.contEmail = user.Email;
    this.contTel = user.MobileNo;
  }

  public filterChange(filter: any): void {
    let distributor = this.distributors.filter((s) => (s.FirstName + ' ' + s.LastName).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    this.listDistributors = distributor && distributor.length > 0 ? distributor.map(s => { return s.FirstName + ' ' + s.LastName }) : [];

  }

  public valueChange(value: any): void {
    this.selectedDistributor = this.distributors.find((s) => (s.FirstName + ' ' + s.LastName) == value.toLowerCase());
  }

  private getPendingRequest = async () => {
    this.isGridLoading = true;
    this.gridData = [];
    let url: string = `api/request/company/getall/${this.user.LoginName}/1`;
    this.httpService.getData(url).then(res => {
      if (res) {
        this.gridData = res.result;
        console.log(res);
      }
      this.isGridLoading = false;
    }).catch(err => {
      console.error(err);
      this.isGridLoading = false;
    })
  }

  private getDistributors = async () => {
    this.isLoading = true;
    let url: string = `api/getall/distributor`;
    this.httpService.getData(url).then(res => {
      if (res) {
        this.distributors = res.result;
        res.result.forEach(e => {
          this.listDistributors.push(e.FirstName + ' ' + e.LastName);
        });
        console.log(res);
        this.isLoading = false;
      }
    }).catch(err => {
      console.error(err);
      this.isLoading = false;
    })
  }

  private assignDistributor = async (loginName: string) => {
    this.isLoading = true;
    let url: string = `api/request/assign/${this.user.LoginName}/${this.selectedReqId}/${loginName}`;
    this.httpService.getData(url).then(res => {
      if (res) {
        console.log(res);
        this.isAssign = false
        this.isLoading = false;
        this.getPendingRequest();
      }
    }).catch(err => {
      this.isLoading = false;
      console.error(err);
    })
  }

  private reject = async (request_id: string) => {
    this.isLoading = true;
    let url: string = `api//request/update/${this.user.LoginName}/${request_id}`;
    this.httpService.postData(url, { RequestStatus: 5 }).then(res => {
      if (res) {
        console.log(res);
        this.isLoading = false;
        this.getPendingRequest();
      }
    }).catch(err => {
      this.isLoading = false;
      console.error(err);
    })
  }

  onAccept = async (request_id: string) => {
    console.log(request_id);
    this.selectedReqId = request_id;
    this.isAssign = true;
  }

  onReject = async (request_id: string) => {
    this.reject(request_id);
  }

}
