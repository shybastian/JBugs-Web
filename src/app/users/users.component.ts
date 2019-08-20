import {Component, OnInit} from '@angular/core';
import {User} from '../user-management/models/user.model';
import {UserService} from '../user-management/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[];

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this.service.getAllUsers().subscribe(users => {
      this.users = users;
    });
    console.log(this.users);
  }

}
