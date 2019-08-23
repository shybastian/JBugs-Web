import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user-management/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsersComponent} from './users/users.component';
import {BugsComponent} from './bugs/bugs.component';
import {LoggedInGuard} from './logged-in.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserViewComponent} from './user-management/user-view/user-view.component';
import {UserCreateComponent} from './user-management/user-create/user-create.component';
import {NotificationComponent} from './notification/notification.component';
import {BugCreateComponent} from './bug-management/bug-create/bug-create.component';


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
            path: '',
            component: UsersComponent
          },
          {
            path: 'view',
            component: UserViewComponent
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
            path: '',
            component: BugsComponent
          },
          {
            path: 'create',
            component: BugCreateComponent
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
export class AppRoutingModule { }
