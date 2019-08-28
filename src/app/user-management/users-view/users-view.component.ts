import {Component, DoCheck, OnInit} from '@angular/core';
import {User, UserStatusType, UserStatusTypeSTRING} from '../models/user.model';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../login/services/storage.service';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {DialogService} from 'primeng/api';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
  providers: [DialogService]
})
export class UsersViewComponent implements OnInit, DoCheck {

  displayEditDialog: boolean;
  displayDialog: boolean;

  displayUpdateDialog: boolean;
  selectedUser: User;
  users: User[];
  cols: any[];

  constructor(private storageService: StorageService, private router: Router,
              private userService: UserService, private translate: TranslateService, public dialogService: DialogService) {
  }

  ngDoCheck(): void {
    if (this.users === undefined) {
      return;
    }
    if (this.users === null) {
      return;
    }
    // only if iterable, apply changes, i.e. after getUsers
    for (let user of this.users) {
      // console.log('inside');
      if (user.status === UserStatusType.Active) {
        user.stringStatus = this.translate.instant('USERS.Active');
      } else {
        user.stringStatus = this.translate.instant('USERS.Inactive');
      }
    }
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      for (let user of this.users) {
        if (user.status === UserStatusType.Active) {
          user.stringStatus = this.translate.instant('USERS.Active');
        } else {
          user.stringStatus = this.translate.instant('USERS.Inactive');
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

  onRowSelect() {
    this.displayDialog = true;
  }

  /**
   * This function gets called when
   *    the user click the Edit button from the User Info pop up
   * It opens the Dynamic Dialog pop up and passes the user id to it
   * When the user closes the Edit User pop up, it updates the users table
   * In case of errors, it alerts the user
   */
  showEditUserDialog() {
    this.userService.getUser(this.selectedUser.id)
      .subscribe(user => {
        const ref = this.dialogService.open(UserEditComponent, {
          data: user,
          header: this.translate.instant('EDIT_USER.HEADER'),

          width: '40%'
        });

        ref.onClose.subscribe((user: User) => {

          if (user) {
            this.updateUser(user);
          }
        });

        this.displayDialog = false;
      }, Error => {
        alert(Error);
      });
  }

  /**
   * When a user was updated,
   * this function gets called to update the users table
   */
  updateUser(user: User) {
    //find the old user using id
    for (let tableUser of this.users) {
      if (tableUser.id == user.id) {
        //it deletes the old user value and adds the new one at the end of the table
        this.users.splice(this.users.indexOf(tableUser), 1);
        tableUser = user;

        tableUser.stringStatus = UserStatusTypeSTRING[UserStatusType[user.status]];
        this.users.push(tableUser);
      }
    }
  }
}

