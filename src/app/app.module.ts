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
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ButtonModule,
  CalendarModule,
  CarouselModule,
  CodeHighlighterModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  ListboxModule,
  MultiSelectModule,
  TabViewModule
} from 'primeng/primeng';
import {BugCreateComponent} from './bug-management/bug-create/bug-create.component';
import {UsersViewComponent} from './user-management/users-view/users-view.component';
import {NotificationComponent} from './notification/notification.component';
import {BugViewComponent} from './bug-management/bug-view/bug-view.component';
import {UserEditComponent} from './user-management/user-edit/user-edit.component';

import {DynamicDialogModule} from 'primeng/dynamicdialog';

import {UserCreateComponent} from './user-management/user-create/user-create.component';
import {EditPermissionsComponent} from './permissions-management/edit-permissions/edit-permissions.component';

import {LoggedInGuard} from './authentication-guards/logged-in.guard';
import {PermissionPermissionGuard} from './authentication-guards/permission-permission.guard';
import {UserPermissionGuard} from './authentication-guards/user-permission.guard';
import {BugPermissionGuard} from './authentication-guards/bug-permission.guard';
import {LoggedOutGuard} from './authentication-guards/logged-out.guard';
import {HeaderComponent} from './header/header.component';
import {NavigateMenuComponent} from './dashboard/navigate-menu/navigate-menu.component';
import {NotificationsViewComponent} from './notifications-management/notifications-view/notifications-view.component';
import {BugEditComponent} from "./bug-management/bug-edit/bug-edit.component";
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';
import {GetBugIdComponent} from "./bug-management/get-bug-id/get-bug-id.component";
import {ToastModule} from "primeng/toast";
import {VirtualScrollerModule} from "primeng/virtualscroller";
import {DataViewModule} from "primeng/dataview";


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
    UserEditComponent,
    HeaderComponent,
    NavigateMenuComponent,
    UserEditComponent,
    UserEditComponent,
    NotificationsViewComponent,
    GetBugIdComponent,
    NotificationsViewComponent,
    BugEditComponent
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
    InputTextModule,
    ToastModule,
    CarouselModule,
    CommonModule,
    ButtonModule,
    TabViewModule,
    CodeHighlighterModule,
    VirtualScrollerModule,
    DataViewModule,
    PDFExportModule
  ],
  providers: [DatePipe, LoggedInGuard, PermissionPermissionGuard, UserPermissionGuard, BugPermissionGuard, LoggedOutGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    UserEditComponent,
    BugEditComponent
  ]
})
export class AppModule { }
