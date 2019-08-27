import {Component, OnInit} from '@angular/core';
import {StorageService} from "../user-management/login/services/storage.service";
import {PermissionType} from "../user-management/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  disableUser = true;
  disablePermission = true;
  disableBug = true;

  userButtonContainers = [
    {id: 1, name: 'create user', router: 'create', translation: 'DASHBOARD.CREATE_USER'},
    {id: 2, name: 'view users', router: 'view', translation: 'DASHBOARD.VIEW_USER'}
  ];
  bugButtonContainers = [
    {id: 1, name: 'create bug', router: 'create', translation: 'DASHBOARD.CREATE_BUG'},
    {id: 2, name: 'view bugs', router: 'view', translation: 'DASHBOARD.VIEW_BUG'}
  ];
  permissionsButtonContainers = [
    {id: 1, name: 'DASHBOARD.EDIT_PERMISSION', router: 'edit'}
  ];

  currentUserButton = false;
  currentBugButton = false;
  currentPermissionsButton = false;

  constructor(private storageService: StorageService, private router: Router) {
    this.userButtonDisable();
    this.bugButtonDisable();
    this.permissionButtonDisable();
  }

  ngOnInit() {
  }

  activeUserButton() {
    if (this.currentUserButton === true) {
      this.currentUserButton = false;
    } else {
      this.currentUserButton = true;
    }
  }

  activeBugButton() {
    if (this.currentBugButton === true) {
      this.currentBugButton = false;
    } else {
      this.currentBugButton = true;
    }
  }

  activePermissionsButton() {
    if (this.currentPermissionsButton === true) {
      this.currentPermissionsButton = false;
    } else {
      this.currentPermissionsButton = true;
    }
  }

  userButtonDisable() {
    if (this.storageService.userHasPermission(PermissionType.USER_MANAGEMENT)) {
      this.disableUser = false;
    }
  }

  bugButtonDisable() {
    if (this.storageService.userHasPermission(PermissionType.BUG_MANAGEMENT)) {
      this.disableBug = false;
    }
  }

  permissionButtonDisable() {
    if (this.storageService.userHasPermission(PermissionType.PERMISSION_MANAGEMENT)) {
      this.disablePermission = false;
    }
  }

//log out
  atLogout() {
    this.storageService.atLogout();
    this.router.navigate(['/login']);
  }


}
