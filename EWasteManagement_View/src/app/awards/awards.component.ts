import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/https.service';
import { CommonService } from '../services/common.service';
import { UserModel } from '../models/user.model';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.less']
})
export class AwardsComponent implements OnInit {

  constructor(private httpService: HttpService, private commonService: CommonService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.user = this.commonService.getUser();
    this.getContributors();
  }
  public providers: Array<{ name: string; id:string; icon: string; selected?: boolean }> = [
    { name: 'Nolimit', id: '5ec96c40e7179a6b6363b059', icon: 'data:image/png;base64,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', selected: false },
    { name: 'House of Fashion', id: '5ec96c91e7179a6b6363b073',icon: 'https://rainbowpages.lk/uploads/listings/logo/h/houseoffasion.jpg', selected: false }
  ];

  requests: any[] = [];
  public reward:any;
  public rewards: any[] = [];
  private user: UserModel;

  listContributors: string[] = [];
  Contributors: any[] = [];
  selectedContributor: any = {};
  isAssign: boolean = false;


  public getRewards = async(id:string) =>{
    let url: string = "api/rewards/get/" + id;

    this.httpService.getData(url).then(res => {
      if(res && res.length > 0){
        this.rewards = res.map(i => {i["selected"] = false; return i});
      }
    });

  }

  public selectReward(reward:any){
    this.reward = reward;
  }

  
  public filterChange(filter: any): void {
    let Contributor = this.Contributors.filter((s) => (s.FirstName.trim() + s.LastName.trim()).toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
    this.listContributors = Contributor && Contributor.length > 0 ? Contributor.map(s => { return s.FirstName + ' ' + s.LastName }) : [];

  }

  public valueChange(value: any): void {
    this.selectedContributor = this.Contributors.find((s) => (s.FirstName + ' ' + s.LastName).toLowerCase() == value.toLowerCase());
  }

  private getContributors = async () => {
    //this.isLoading = true;
    let url: string = `api/getall/contributor`;
    this.httpService.getData(url).then(res => {
      if (res) {
        this.getRequest();
        this.Contributors = res.result;
        //this.isLoading = false;
      }
    }).catch(err => {
      console.error(err);
      //this.isLoading = false;
    })
  }

  private getRequest = async () => {
    let url: string = `api/request/company/getall/${this.user.LoginName}/4`;
    this.httpService.getData(url).then(res => {
      if (res) {
        this.requests = res.result;
        this.bindContributors();
        console.log(res);
      }
    }).catch(err => {
      console.error(err);
    })
  }

  assignContributor = async(loginName:string) =>{
    let url: string = `api/rewards/assing/${this.reward._id}/${loginName}/${this.user.LoginName}`;
    this.httpService.getData(url).then(res => {
      if (res) {
        this.notificationService.show({
          content: `Reward offered to contributor successfully!`,
          cssClass: 'button-notification',
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'bottom' },
          type: { style: 'success', icon: true },
          closable: false
        });
        console.log(res);
      }
    }).catch(err => {
      console.error(err);
    })
  }

  private bindContributors(){
    let contributors:any[] = [];
    let requests: any[] = [];
    this.Contributors.forEach(x => {
      requests = this.requests.filter(i => i.RaisedBy == x.LoginName);
      if(requests.length > 0){
        x['Count'] = requests.length;
        contributors.push(x);
      }
    })
    this.Contributors = contributors;
    this.Contributors.forEach(e => {
      this.listContributors.push(e.FirstName + ' ' + e.LastName);
    });
    console.log(this.Contributors);
  }
}
