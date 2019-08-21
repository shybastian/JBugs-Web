import {Component, OnInit} from '@angular/core';
import {User} from "../user-management/models/user.model";
import {UserService} from "../user-management/services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BugService} from "../bug-management/services/bug.service";
import {Bug} from "../bug-management/model/bug.model";

@Component({
  selector: 'app-bug-create',
  templateUrl: './bug-create.component.html',
  styleUrls: ['./bug-create.component.scss']
})
export class BugCreateComponent implements OnInit {
  private todayDate = new Date();
  private bugStatusText = "New";
  private bugCreatedID = "etc";
  private listOfUsersToAssign: User[];

  private bugCreateForm: FormGroup;

  private bugToCreate: Bug;

  constructor(private userService: UserService, private bugService: BugService, private formBuilder: FormBuilder) {
    this.bugCreateForm = formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.minLength(250)]),
      version: new FormControl(null, [Validators.required]),
      fixedVersion: new FormControl(null),
      targetDate: new FormControl(null),
      severity: new FormControl(null, [Validators.required]),
      CREATED_ID: new FormControl(null),
      status: new FormControl(null),
      ASSIGNED_ID: new FormControl(null)
    })

  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.listOfUsersToAssign = users;
    });
  }

  onSubmit() {

    this.bugToCreate.title = this.bugCreateForm.get("title").value.toString();
    this.bugToCreate.description = this.bugCreateForm.get("description").value.toString();
    this.bugToCreate.version = this.bugCreateForm.get("version").value.toString();
    this.bugToCreate.targetDate = this.bugCreateForm.get("targetDate").value.toString();
    this.bugToCreate.status = this.bugCreateForm.get("status").value.toString();
    this.bugToCreate.fixedVersion = this.bugCreateForm.get("fixedVersion").value.toString();
    this.bugToCreate.severity = this.bugCreateForm.get("severity").value.toString();
    this.bugToCreate.CREATED_ID = this.bugCreateForm.get("CREATED_ID").value.toString();
    this.bugToCreate.ASSIGNED_ID = this.bugCreateForm.get("ASSIGNED_ID").value.toString();

    console.log(this.bugToCreate);

    this.bugService.submitBug(this.bugToCreate);


  }
}
