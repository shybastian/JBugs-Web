import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoggedInGuard} from './logged-in.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UsersViewComponent} from './user-management/users-view/users-view.component';
import {UserCreateComponent} from './user-management/user-create/user-create.component';
import {NotificationComponent} from './notification/notification.component';
import {BugCreateComponent} from './bug-management/bug-create/bug-create.component';
import {EditPermissionsComponent} from './permissions-management/edit-permissions/edit-permissions.component';
import {BugViewComponent} from './bug-management/bug-view/bug-view.component';
import {UserViewComponent} from "./user-management/user-view/user-view.component";
import {NotificationComponent} from "./notification/notification.component";
import {BugViewComponent} from "./bug-management/bug-view/bug-view.component";
import {BugCreateComponent} from "./bug-management/bug-create/bug-create.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {LoginComponent} from "./user-management/login/login.component";



const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'users',
        children: [
          {
            path: 'view',
            component: UsersViewComponent
          },
          {
            path: 'create',
            component: UserCreateComponent
          },
          {
            path: 'edit/:id',
            component: PageNotFoundComponent
          }
        ]
      },
      {
        path: 'bugs',
        children: [
          {
            path: 'view',
            component: BugViewComponent
          },
          {
            path: 'create',
            component: BugCreateComponent
          }
        ]
      },
      {
        path: 'permissions',
        children: [
          {
            path: 'edit',
            component: EditPermissionsComponent
          }
        ]
      },
      {
        path: 'notifications',
        component: NotificationComponent
      }

    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
