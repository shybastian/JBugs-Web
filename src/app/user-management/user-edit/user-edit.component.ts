import {Component, OnInit} from '@angular/core';
import {RoleDTO, UserEditWrapper} from "../models/user.model";
import {Role} from "../models/role";
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/api";
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  //current user to be updated
  user: UserEditWrapper;

  showMultiselectRequiredMessage = false;

  passwordWasEdited: boolean;

  showStatus = true;

  isCounterNotValid: boolean;

  isCounterNull: boolean;

  //available roles for user profile
  roles: RoleDTO[] = [
    {type: Role.ADMINISTRATOR},
    {type: Role.PROJECT_MANAGER},
    {type: Role.TEST_MANAGER},
    {type: Role.DEVELOPER},
    {type: Role.TESTER}
  ];

  constructor(private notifier: NotifierService, private userService: UserService, private translate: TranslateService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  /**
   * When this component is initialized,
   * this function is called.
   * It initializes the values of the current user used by the form input fields
   */
  ngOnInit() {
    this.user = this.config.data;
    this.user.password = "default";
    this.passwordWasEdited = false;
    this.isCounterNotValid = false;
    this.isCounterNull = false;

    //if the user can not be deactived the form won't offer the option
    //the userService send a reguest to check that
    this.userService.checkDeactivation(this.user.id)
      .subscribe(data => {
        this.showStatus = data;
      }, Error => {
        alert(Error);
      });
  }

  /**
   * The method gets called when the user presses the Edit button
   *    and send the user data to the services to be sent to the server
   * If the user was updated successfully we inform the user, if not, we
   *    alert him
   */
  editUser(editUserForm: NgForm) {
    if (!this.user.status)
      this.user.status = 0;
    else
      this.user.status = 1;
    if (!this.passwordWasEdited)
      this.user.password = "";
    this.userService.editUser(this.user)
      .subscribe(data => {
        this.notifier.notify("success", this.translate.instant('EDIT_USER.ALERT_SUCCESS_EDIT_USER'));
        this.ref.close(data);
      }, Error => {
        alert(this.translate.instant('EDIT_USER.ALERT_FAIL_EDIT_USER'));
        this.ref.close();
      });
  }

  /**
   * This method gets called when the user changes the roles corresponding
   *    to the current user
   * It checks if an error message regarding the roles selection should be shown
   */
  handleSelectionChange(event) {
    this.showMultiselectRequiredMessage = (this.user.roles.length === 0) ? true : false;
  }

  /**
   * This method gets called when the user changes the password
   *    so we know if the initial password was updated
   */
  changePassword() {
    if (!this.passwordWasEdited) {
      this.passwordWasEdited = true;
      this.user.password = "";
    }
  }

  validCounter() {
    if (this.user.counter == null)
      this.isCounterNull = true;
    else
      this.isCounterNull = false;
    if (this.user.counter >= 0 && this.user.counter <= 5)
      this.isCounterNotValid = false;
    else
      this.isCounterNotValid = true;
  }
}


