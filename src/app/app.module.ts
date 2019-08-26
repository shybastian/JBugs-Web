import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BugsComponent} from './bugs/bugs.component';
import {LoginComponent} from './user-management/login/login.component';
import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
  ButtonModule,
  CalendarModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  ListboxModule,
  MultiSelectModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {BugCreateComponent} from './bug-management/bug-create/bug-create.component';
import {UsersViewComponent} from './user-management/users-view/users-view.component';
import {NotificationComponent} from './notification/notification.component';
import {UserCreateComponent} from './user-management/user-create/user-create.component';
import {EditPermissionsComponent} from './permissions-management/edit-permissions/edit-permissions.component';
import {BugViewComponent} from "./bug-management/bug-view/bug-view.component";


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    LoginComponent,
    UsersComponent,
    DashboardComponent,
    PageNotFoundComponent,
    UserCreateComponent,
    BugCreateComponent,
    UsersViewComponent,
    NotificationComponent,
    EditPermissionsComponent,
    BugViewComponent
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
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DropdownModule,
    ListboxModule,
    ButtonModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [DatePipe, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
