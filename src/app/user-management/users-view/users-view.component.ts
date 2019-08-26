import {Component, DoCheck, OnInit} from '@angular/core';
import {User, UserStatusType, UserStatusTypeSTRING} from '../models/user.model';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../login/services/storage.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit, DoCheck {

  displayDialog: boolean;
  selectedUser: User;
  users: User[];
  cols: any[];

  constructor(private storageService: StorageService, private translate: TranslateService, private router: Router, private userService: UserService) {
  }

  ngDoCheck(): void {
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
      console.log('before', this.users);
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
    console.log('selected', this.selectedUser);
    this.displayDialog = true;
  }
}
