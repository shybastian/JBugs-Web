import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BugsComponent} from './bugs/bugs.component';
import {LoginComponent} from './login/login.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule} from '@angular/forms';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {CalendarModule, DialogModule, MultiSelectModule, PaginatorModule} from 'primeng/primeng';
import {BugViewComponent} from "./bug-management/bug-view/bug-view.component";
import { BugUpdateStatusComponent } from './bug-management/bug-update-status/bug-update-status.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    LoginComponent,
    UserEditComponent,
    UsersComponent,
    DashboardComponent,
    PageNotFoundComponent,
    BugViewComponent,
    BugUpdateStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    MultiSelectModule,
    PaginatorModule,
    CalendarModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
