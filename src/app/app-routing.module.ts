import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user-management/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoggedInGuard} from './logged-in.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UsersViewComponent} from './user-management/users-view/users-view.component';
import {UserCreateComponent} from './user-management/user-create/user-create.component';
import {NotificationComponent} from './notification/notification.component';
import {BugCreateComponent} from './bug-management/bug-create/bug-create.component';
import {EditPermissionsComponent} from './permissions-management/edit-permissions/edit-permissions.component';
import {BugViewComponent} from './bug-management/bug-view/bug-view.component';
import {PermissionComponent} from "./permission/permission.component";
import {EditPermissionComponent} from "./edit-permission/edit-permission.component";


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
      },
      {
        path: 'permissions',
        children: [
          {
            path: '',
            component: PermissionComponent
          },
          {
            path: 'edit',
            component: EditPermissionComponent
          }
        ]
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
