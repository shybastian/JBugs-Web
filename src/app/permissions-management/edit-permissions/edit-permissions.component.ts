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
    {id: 1, type: 'Administrator', role: Role.ADMINISTRATOR},
    {id: 2, type: 'Project Manager', role: Role.PROJECT_MANAGER},
    {id: 3, type: 'Test Manager', role: Role.TEST_MANAGER},
    {id: 4, type: 'Developer', role: Role.DEVELOPER},
    {id: 5, type: 'Tester', role: Role.TESTER}
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

  ngOnInit() {
    this.service.getRolePermissions(this.roles[0]).subscribe(permissions => {
      this.rolePermissions = permissions;
    });
    this.selectedRole = this.roles[0];
    this.permissions = this.adminPermissions;
  }

  handlePermissionChange(obj) {
    this.service.setRolePermissions(this.selectedRole, this.rolePermissions)
      .subscribe(data => {
      }, Error => {
      });
  }

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
