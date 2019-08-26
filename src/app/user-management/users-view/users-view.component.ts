import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  displayDialog: boolean;

  user: User;

  selectedUser: User;

  newUser: boolean;

  users: User[];

  cols: any[];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => this.users = users);

    this.cols = [
      {field: 'id', header: 'id'},
      {field: 'firstName', header: 'firstName'},
      {field: 'lastName', header: 'lastName'},
      {field: 'username', header: 'username'},
      {field: 'email', header: 'email'},
      {field: 'mobileNumber', header: 'mobileNumber'},
      {field: 'status', header: 'status'},
      {field: 'counter', header: 'counter'}
    ];
  }

  showDialogToAdd() {
    this.router.navigate(['/dashboard/users/create']).then();
    // this.newUser = true;
    // this.user = undefined;
    // this.displayDialog = true;
  }

  save() {
    let users = [...this.users];
    if (this.newUser) {
      users.push(this.user);
    } else {
      users[this.users.indexOf(this.selectedUser)] = this.user;
    }

    this.users = users;
    this.user = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.users.indexOf(this.selectedUser);
    this.users = this.users.filter((val, i) => i != index);
    this.user = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.displayDialog = true;
  }

  cloneUser(c: User): User {
    let user: User;
    for (let prop in c) {
      user[prop] = c[prop];
    }
    return user;
  }
}
