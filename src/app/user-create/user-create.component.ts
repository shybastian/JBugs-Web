import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user-management/services/user.service';
import {RoleWrapper} from '../user-management/models/user.model';
import {Role} from '../user-management/models/role';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

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

  showMultiselectRequiredMessage = true;

  constructor(private service: UserService, public translate: TranslateService, private router: Router) {
  }

  ngOnInit() {
  }

  addUser(userForm: NgForm) {
    this.service.addUser(this.firstNameValue, this.lastNameValue, this.phoneValue, this.emailValue, this.selectedRoles)
      .subscribe(data => {
        alert(this.translate.instant('ADD_USER.ALERT_SUCCESS_CREATED_USER'));
        this.router.navigate(['/dashboard'])
      }, Error => {
        alert(this.translate.instant('ADD_USER.ALERT_FAIL_CREATED_USER'));
      });
  }

  handleSelectionChange(event) {
    this.showMultiselectRequiredMessage = (this.selectedRoles.length === 0) ? true : false;
  }
}
