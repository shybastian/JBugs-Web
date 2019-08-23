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
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, CalendarModule, DialogModule, DropdownModule, MultiSelectModule} from 'primeng/primeng';

import {UserCreateComponent} from './user-management/user-create/user-create.component';
import {BugCreateComponent} from './bug-management/bug-create/bug-create.component';
import {UserViewComponent} from './user-management/user-view/user-view.component';
import {NotificationComponent} from './notification/notification.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    LoginComponent,
    UserEditComponent,
    UsersComponent,
    DashboardComponent,
    PageNotFoundComponent,
    UserCreateComponent,
    BugCreateComponent,
    UserViewComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    DialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ButtonModule,
    DropdownModule,
    CalendarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
