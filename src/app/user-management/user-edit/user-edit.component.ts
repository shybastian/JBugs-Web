import {Component, OnInit} from '@angular/core';
import {RoleDTO, UserEditWrapper} from "../models/user.model";
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/api";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: UserEditWrapper;
  selectedRoles: RoleDTO[];

  showMultiselectRequiredMessage = false;

  passwordWasEdited: boolean;

  showStatus = true;

  roles: RoleDTO[] = [
    {type: 'Administrator'},
    {type: 'Project Manager'},
    {type: 'Test Manager'},
    {type: 'Developer'},
    {type: 'Tester'}
  ];

  constructor(private userService: UserService, private translate: TranslateService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit() {
    this.user = this.config.data;
    this.user.password = "default";
    this.passwordWasEdited = false;

    this.userService.checkDeactivation(this.user.id)
      .subscribe(data => {
        this.showStatus = data;
      }, Error => {
        alert(Error);
      });
  }

  editUser(editUserForm: NgForm) {
    if (!this.passwordWasEdited)
      this.user.password = "";
    this.userService.editUser(this.user)
      .subscribe(data => {
        alert(this.translate.instant('EDIT_USER.ALERT_SUCCESS_EDIT_USER'));
        this.ref.close();
      }, Error => {
        alert(this.translate.instant('EDIT_USER.ALERT_FAIL_CREATED_USER'));
        this.ref.close();
      });
  }

  handleSelectionChange(event) {
    this.showMultiselectRequiredMessage = (this.selectedRoles.length === 0) ? true : false;
  }

  log(param: any) {
    console.log(param);
  }

  changePassword() {
    if (!this.passwordWasEdited) {
      this.passwordWasEdited = true;
      this.user.password = "";
    }
  }
}


