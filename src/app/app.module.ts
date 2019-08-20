import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BugsComponent} from './bugs/bugs.component';
import {LoginComponent} from './user-management/login/login.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule} from '@angular/forms';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ForgotPasswordComponent} from './user-management/login/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    LoginComponent,
    UserEditComponent,
    UsersComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
