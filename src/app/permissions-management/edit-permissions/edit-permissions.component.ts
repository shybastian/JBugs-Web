import {Component, OnInit} from '@angular/core';
import {RoleWrapper} from "../../user-management/models/user.model";
import {Role} from "../../user-management/models/role";
import {Permission, PermissionDTO} from "../models/permission.model";
import {PermissionService} from "../services/permission.service";

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.scss']
})
export class EditPermissionsComponent implements OnInit {

  roles: RoleWrapper[] = [
    {id: 1, type: Role.ADMINISTRATOR, role: Role.ADMINISTRATOR},
    {id: 2, type: Role.PROJECT_MANAGER, role: Role.PROJECT_MANAGER},
    {id: 3, type: Role.TEST_MANAGER, role: Role.TEST_MANAGER},
    {id: 4, type: Role.DEVELOPER, role: Role.DEVELOPER},
    {id: 5, type: Role.TESTER, role: Role.TESTER}
  ];

  selectedRole: RoleWrapper;

  allPermissions: PermissionDTO[] = [
    {id: 1, type: Permission.PERMISSION_MANAGEMENT},
    {id: 2, type: Permission.USER_MANAGEMENT},
    {id: 3, type: Permission.BUG_MANAGEMENT},
    {id: 4, type: Permission.BUG_CLOSE},
    {id: 5, type: Permission.BUG_EXPORT_PDF}
  ];

  adminPermissions: PermissionDTO[] = [
    {id: 2, type: Permission.USER_MANAGEMENT},
    {id: 3, type: Permission.BUG_MANAGEMENT},
    {id: 4, type: Permission.BUG_CLOSE},
    {id: 5, type: Permission.BUG_EXPORT_PDF}
  ];

  permissions: PermissionDTO[];
  rolePermissions: PermissionDTO[];

  constructor(private service: PermissionService) {
  }

  /**
   * When this component is initialized,
   * this function is called.
   * It initializes the values of the form components
   */
  ngOnInit() {
    this.service.getRolePermissions(this.roles[0]).subscribe(permissions => {
      this.rolePermissions = permissions;
    });
    this.selectedRole = this.roles[0];
    this.permissions = this.adminPermissions;
  }

  /**
   * The method gets called when the user changes the permissions selections
   *    and send the role permissions data to the services to be sent to the server
   */
  handlePermissionChange(obj) {
    this.service.setRolePermissions(this.selectedRole, this.rolePermissions)
      .subscribe(data => {
      }, Error => {
      });
  }

  /**
   * The method gets called when the user changes the role selections
   *    and updates the list of available permissions, also selects the permissions
   *    corresponding to the selected role
   */
  handleRoleChange($event: any) {
    if (this.selectedRole.id == 1) {
      this.permissions = this.adminPermissions;
    } else {
      this.permissions = this.allPermissions;
    }

    this.service.getRolePermissions(this.selectedRole).subscribe(permissions => {
      this.rolePermissions = permissions;
    });
  }
}
