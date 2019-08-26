import {Component, OnInit} from '@angular/core';
import {User, UserStatusType, UserStatusTypeSTRING} from '../models/user.model';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  displayDialog: boolean;
  selectedUser: User;
  users: User[];
  cols: any[];

  constructor(private router: Router, private userService: UserService) {
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
      {field: 'id', header: 'id'},
      {field: 'firstName', header: 'firstName'},
      {field: 'lastName', header: 'lastName'},
      {field: 'username', header: 'username'},
      {field: 'email', header: 'email'},
      {field: 'mobileNumber', header: 'mobileNumber'},
      {field: 'stringStatus', header: 'status'}
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
