import {Component, OnInit} from '@angular/core';
import {User} from "../user-management/models/user.model";
import {UserService} from "../user-management/services/user.service";
import {FormControl, NgForm} from "@angular/forms";

@Component({
  selector: 'app-bug-create',
  templateUrl: './bug-create.component.html',
  styleUrls: ['./bug-create.component.scss']
})
export class BugCreateComponent implements OnInit {
  private todayDate = new Date();
  private bugStatusText = "New";

  private users: User[];

  private bugForm = new FormControl();

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this.service.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(form: NgForm) {
    console.log(form)

    let jsonString = JSON.stringify(form.value);
    console.log(jsonString)
  }
}
