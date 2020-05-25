import { Component, OnInit } from '@angular/core';
import { CompanyUser } from '../models/company-register';
import { HttpService } from '../services/https.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {


  user: CompanyUser = new CompanyUser();
  isLoading: boolean = false;

  constructor(private httpService: HttpService, private notificationService: NotificationService, private _router: Router) { }

  ngOnInit() {
  }

  onSubmit = async () => {
    this.isLoading = true;
    let url: string = "api/create/company";

    this.httpService.postData(url, this.user).then(res => {
      console.log(res);
      if (res) {
        if (res.Status == 'success') {
          this.notificationService.show({
            content: 'Registration Successfull! Please login to continue.',
            cssClass: 'button-notification',
            animation: { type: 'slide', duration: 400 },
            position: { horizontal: 'center', vertical: 'bottom' },
            type: { style: 'success', icon: true },
            closable: false
          });
          this._router.navigateByUrl("");
        } else if (res.Status == 'duplicate') {
          this.notificationService.show({
            content: 'Login name already exists!',
            cssClass: 'button-notification',
            animation: { type: 'slide', duration: 400 },
            position: { horizontal: 'center', vertical: 'bottom' },
            type: { style: 'warning', icon: true },
            closable: false
          });
        } else {
          this.notificationService.show({
            content: 'Registration Failed!',
            cssClass: 'button-notification',
            animation: { type: 'slide', duration: 400 },
            position: { horizontal: 'center', vertical: 'bottom' },
            type: { style: 'error', icon: true },
            closable: false
          });
        }
        this.isLoading = false;
      }
    }).catch(err => {
      console.error(err);
      this.isLoading = false;
    })

  }

}
