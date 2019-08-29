import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoggedInGuard} from './authentication-guards/logged-in.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UsersViewComponent} from './user-management/users-view/users-view.component';
import {BugCreateComponent} from './bug-management/bug-create/bug-create.component';
import {EditPermissionsComponent} from './permissions-management/edit-permissions/edit-permissions.component';
import {BugViewComponent} from './bug-management/bug-view/bug-view.component';
import {PermissionPermissionGuard} from "./authentication-guards/permission-permission.guard";
import {BugPermissionGuard} from "./authentication-guards/bug-permission.guard";
import {UserPermissionGuard} from "./authentication-guards/user-permission.guard";
import {LoggedOutGuard} from "./authentication-guards/logged-out.guard";
import {LoginComponent} from "./user-management/login/login.component";
import {UserCreateComponent} from "./user-management/user-create/user-create.component";
import {NotificationsViewComponent} from "./notifications-management/notifications-view/notifications-view.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'users',
        canActivate: [UserPermissionGuard],
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
        canActivate: [BugPermissionGuard],
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
        canActivate: [PermissionPermissionGuard],
        children: [
          {
            path: 'edit',
            component: EditPermissionsComponent
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: 'view',
            component: NotificationsViewComponent
          }
        ]
      }
,
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
