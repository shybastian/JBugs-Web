import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./users/users.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {LoggedInGuard} from "./logged-in.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {BugViewComponent} from "./bug-management/bug-view/bug-view.component";
import {BugUpdateStatusComponent} from "./bug-management/bug-update-status/bug-update-status.component";


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
            path: ':userId',
            children: [
              {
                path: 'edit',
                component: UserEditComponent
              }
            ]
          }
        ]
      },
      {
        path: 'bugs-view-filter',
        component: BugViewComponent
      },
      {
        path: 'update-status',
        component: BugUpdateStatusComponent
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
