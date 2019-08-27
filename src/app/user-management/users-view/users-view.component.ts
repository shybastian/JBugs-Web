import {Component, DoCheck, OnInit} from '@angular/core';
import {User, UserStatusType, UserStatusTypeSTRING} from '../models/user.model';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../login/services/storage.service';
import {UserEditComponent} from "../user-edit/user-edit.component";
import {DialogService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
  providers: [DialogService]
})
export class UsersViewComponent implements OnInit, DoCheck {

  displayEditDialog: boolean;

  displayDialog: boolean;
  selectedUser: User;
  users: User[];
  cols: any[];

  constructor(private storageService: StorageService, private translate: TranslateService, private router: Router, private userService: UserService, private translate: TranslateService, public dialogService: DialogService) {
  }

  ngDoCheck(): void {
    if (this.users !== undefined) {
      return;
    }
    if (this.users !== null) {
      return;
    }
    // only if iterable, apply changes, i.e. after getUsers
    for (let user of this.users) {
      if (user.status === UserStatusType.Active) {
        user.stringStatus = this.translate.instant('USERS.' + UserStatusTypeSTRING.Active);
      } else {
        user.stringStatus = this.translate.instant('USERS.' + UserStatusTypeSTRING.Inactive);
      }
    }
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      for (let user of this.users) {
        if (user.status === UserStatusType.Active) {
          user.stringStatus = UserStatusTypeSTRING.Active;
        } else {
          user.stringStatus = UserStatusTypeSTRING.Inactive;
        }
      }
    });

    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'firstName', header: 'FIRST_NAME'},
      {field: 'lastName', header: 'LAST_NAME'},
      {field: 'username', header: 'USERNAME'},
      {field: 'email', header: 'EMAIL'},
      {field: 'mobileNumber', header: 'PHONE'},
      {field: 'stringStatus', header: 'STATUS'}
    ];

    this.displayEditDialog = false;
  }

  addNewUser() {
    this.router.navigate(['/dashboard/users/create']).then();
  }

  ok() {
    this.displayDialog = false;
  }

  edit() {
    this.displayDialog = false;
    // send selectedUser.ID to user-EDIT component
    this.router.navigate(['dashboard/users/edit', this.selectedUser.id]).then();

    // to be added in EDIT component
    // in ctor :           private route: ActivatedRoute
    // to retrieve id:     this.route.snapshot.paramMap.get('id');
  }

  onRowSelect() {
    // console.log('selected', this.selectedUser);
    this.displayDialog = true;
  }

  cloneUser(c: User): User {
    let user: User;
    for (let prop in c) {
      user[prop] = c[prop];
    }
    return user;
  }

  showEditUserDialog() {
    this.userService.getUser(this.selectedUser.id)
      .subscribe(user => {
        const ref = this.dialogService.open(UserEditComponent, {
          data: user,
          header: this.translate.instant('EDIT_USER.HEADER'),

          width: '40%'
        });
      }, Error => {
        alert('Error');
      });
  }
}

