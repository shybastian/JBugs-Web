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
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ButtonModule,
  CalendarModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  ListboxModule,
  MultiSelectModule
} from 'primeng/primeng';
import {BugCreateComponent} from './bug-management/bug-create/bug-create.component';
import {UsersViewComponent} from './user-management/users-view/users-view.component';
import {NotificationComponent} from './notification/notification.component';
import {BugViewComponent} from "./bug-management/bug-view/bug-view.component";
import {UserEditComponent} from './user-management/user-edit/user-edit.component';

import {DynamicDialogModule} from 'primeng/dynamicdialog';

import {UserCreateComponent} from "./user-management/user-create/user-create.component";
import {EditPermissionsComponent} from "./permissions-management/edit-permissions/edit-permissions.component";

import {LoggedInGuard} from "./authentication-guards/logged-in.guard";
import {PermissionPermissionGuard} from "./authentication-guards/permission-permission.guard";
import {UserPermissionGuard} from "./authentication-guards/user-permission.guard";
import {BugPermissionGuard} from "./authentication-guards/bug-permission.guard";
import {LoggedOutGuard} from "./authentication-guards/logged-out.guard";

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    BugCreateComponent,
    LoginComponent,
    UsersComponent,
    DashboardComponent,
    PageNotFoundComponent,
    UserCreateComponent,
    BugCreateComponent,
    UsersViewComponent,
    NotificationComponent,
    BugViewComponent,
    EditPermissionsComponent,
    BugViewComponent,
    UserEditComponent
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
    DynamicDialogModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [DatePipe, LoggedInGuard, PermissionPermissionGuard, UserPermissionGuard, BugPermissionGuard, LoggedOutGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    UserEditComponent
  ]
})
export class AppModule { }
