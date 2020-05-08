import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpService } from './services/https.service';
import {
  MatInputModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { RequestsComponent } from './requests/requests.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReportsComponent } from './reports/reports.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RequestHistoryComponent } from './request.history/request.history.component';
import { CommonService } from './services/common.service';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { RegisterComponent } from './register/register.component';
import { NotificationModule } from '@progress/kendo-angular-notification';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RequestsComponent,
    ReportsComponent,
    RequestHistoryComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    GridModule,
    DropDownsModule,
    ButtonsModule,
    DialogsModule,
    NotificationModule
  ],
  providers: [HttpService, AuthenticationService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
