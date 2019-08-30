import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../user-management/login/services/storage.service";
import {Router} from "@angular/router";
import {PermissionType} from "../../user-management/models/user.model";

@Component({
  selector: 'app-navigate-menu',
  templateUrl: './navigate-menu.component.html',
  styleUrls: ['./navigate-menu.component.scss']
})
export class NavigateMenuComponent implements OnInit {
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
  currentNotificationsButton = false;

  constructor(private storageService: StorageService, private router: Router) {
    this.userButtonDisable();
    this.bugButtonDisable();
    this.permissionButtonDisable();
    // this.navigateAfterLogin()
    // this.userNameOnHeader.emit(sessionStorage.getItem('user_firstName'));
  }

  ngOnInit() {
  }

  activeNotificationsButton() {
    if (this.currentNotificationsButton === true) {
      this.currentNotificationsButton = false;
    } else {
      this.currentNotificationsButton = true;
    }
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

  atLogout() {
    this.storageService.atLogout();
    this.router.navigate(['/login']);
  }

}
