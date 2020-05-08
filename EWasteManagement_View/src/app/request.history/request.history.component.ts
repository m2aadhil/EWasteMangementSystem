import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/https.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CommonService } from '../services/common.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserModel } from '../models/user.model';
import { RequestModel } from '../models/requests.mode';

@Component({
  selector: 'app-request-history',
  templateUrl: './request.history.component.html',
  styleUrls: ['./request.history.component.less']
})
export class RequestHistoryComponent implements OnInit {


  constructor(private httpService: HttpService, private commonService: CommonService, private sanitizer: DomSanitizer,
    private notificationService: NotificationService) { }

  private user: UserModel;
  assignedto: string = "";
  isLoading: boolean = false;
  isGridLoading: boolean = false;
  isContLoading: boolean = false;
  isAssign: boolean = false;
  imageUrl: SafeUrl;
  selectedRequest: RequestModel = new RequestModel();

  selectedReqId: string = "";
  contName: string = "";
  contAddress: string = "";
  contTel: string = "";
  contEmail: string = "";

  gridDataPending: any[] = [];
  gridDataReject: any[] = [];

  ngOnInit() {
    this.user = this.commonService.getUser();
    this.getPendingRequest();
    this.getRejected();
  }

  onSelectChange = async ($event) => {
    console.log($event[0]);
    this.isContLoading = true;
    let url: string = `api/request/get/${$event[0]}`;
    this.httpService.getData(url).then(res => {
      if (res) {
        console.log(res.result[0].Assignedto);
        this.selectedRequest = res.result[0];
        this.setSelected(res.result[0].Contributor)
        if (res.result[0].Assignedto) {
          this.assignedto = res.result[0].Assignedto
        } else {
          this.assignedto = "";
        }

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

  private getPendingRequest = async () => {
    this.isGridLoading = true;
    this.gridDataPending = [];
    let url: string = `api/request/company/getall/${this.user.LoginName}/3`;
    this.httpService.getData(url).then(res => {
      if (res) {
        this.gridDataPending = res.result;
        console.log(res);
      }
      this.isGridLoading = false;
    }).catch(err => {
      console.error(err);
      this.isGridLoading = false;
    })
  }

  private getRejected = async () => {
    this.isGridLoading = true;
    this.gridDataReject = [];
    let url: string = `api/request/company/getall/${this.user.LoginName}/5`;
    this.httpService.getData(url).then(res => {
      if (res) {
        this.gridDataReject = res.result;
        console.log(res);
      }
      this.isGridLoading = false;
    }).catch(err => {
      console.error(err);
      this.isGridLoading = false;
    })
  }

}
