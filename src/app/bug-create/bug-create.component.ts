import {Component, OnInit} from '@angular/core';
import {User} from '../user-management/models/user.model';
import {UserService} from '../user-management/services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BugService} from '../bug-management/services/bug.service';
import {Bug} from '../bug-management/model/bug.model';

@Component({
  selector: 'app-bug-create',
  templateUrl: './bug-create.component.html',
  styleUrls: ['./bug-create.component.scss']
})
export class BugCreateComponent implements OnInit {
  private todayDate = new Date();
  private listOfUsersToAssign: User[];

  private createdUser: User = {
    id: 3,
    firstName: 'test',
    lastName: 'test',
    username: 'testt',
    password: 'asdfghjkl',
    counter: 0,
    email: 'test',
    mobileNumber: 'test',
    status: 1,
    roles: undefined,
  };

  private assignedUser: User = {
    id: 4,
    firstName: 'sebi',
    lastName: 'sebi',
    username: 'sebis',
    password: 'sebisebi',
    counter: 0,
    email: 'sebi',
    mobileNumber: 'sebi',
    status: 1,
    roles: undefined,
  };

  private bugCreateForm: FormGroup;
  private bugToCreate: Bug = {
    ID: 0,
    title: '',
    description: '',
    version: '',
    targetDate: '',
    status: '',
    fixedVersion: '',
    severity: '',
    CREATED_ID: undefined,
    ASSIGNED_ID: undefined
  };

  constructor(private userService: UserService, private bugService: BugService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.bugCreateForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      version: new FormControl(null, [Validators.required]),
      fixedVersion: new FormControl(null),
      targetDate: new FormControl(null),
      severity: new FormControl(null, [Validators.required]),
      CREATED_ID: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      ASSIGNED_ID: new FormControl(null),
      attachment: new FormControl(null)
    });

    this.bugCreateForm.get('status').setValue('NEW');
    this.bugCreateForm.get('CREATED_ID').setValue(this.createdUser.username);
    this.bugCreateForm.get('fixedVersion').setValue('');
    this.bugCreateForm.get('ASSIGNED_ID').setValue(this.assignedUser.username);

    this.userService.getAllUsers().subscribe(users => {
      this.listOfUsersToAssign = users;
    });
  }

  onSubmit() {
    this.bugToCreate.title = this.bugCreateForm.get('title').value.toString();
    // this.bugToCreate.description = this.bugCreateForm.get('description').value.toString();
    this.bugToCreate.description = 'a';
    this.bugToCreate.version = this.bugCreateForm.get('version').value.toString();
    this.bugToCreate.targetDate = this.bugCreateForm.get('targetDate').value.toString();
    this.bugToCreate.status = this.bugCreateForm.get('status').value.toString();
    this.bugToCreate.fixedVersion = this.bugCreateForm.get('fixedVersion').value.toString();
    this.bugToCreate.severity = this.bugCreateForm.get('severity').value.toString();
    // this.bugToCreate.CREATED_ID = this.bugCreateForm.get('CREATED_ID').value.toString();
    this.bugToCreate.CREATED_ID = this.createdUser;
    // this.bugToCreate.ASSIGNED_ID = this.bugCreateForm.get('ASSIGNED_ID').value.toString();
    this.bugToCreate.ASSIGNED_ID = this.assignedUser;

    this.bugService.submitBug(this.bugToCreate);
  }
}
