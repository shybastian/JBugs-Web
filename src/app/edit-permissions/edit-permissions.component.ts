import {Component, OnInit} from '@angular/core';
import {RoleWrapper} from "../user-management/models/user.model";
import {Role} from "../user-management/models/role";

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.scss']
})
export class EditPermissionsComponent implements OnInit {

  constructor() {
  }

  roles: RoleWrapper[] = [
    {id: 1, type: 'Administrator', role: Role.ADMINISTRATOR},
    {id: 2, type: 'Project Manager', role: Role.PROJECT_MANAGER},
    {id: 3, type: 'Test Manager', role: Role.TEST_MANAGER},
    {id: 4, type: 'Developer', role: Role.DEVELOPER},
    {id: 5, type: 'Tester', role: Role.TESTER}
  ];

  firstNameValue: string;
  lastNameValue: string;
  phoneValue: string;
  emailValue: string;
  selectedRoles: RoleWrapper[];

  ngOnInit() {
  }

}
