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
    {id: 1, name: 'create user', router: 'create'},
    {id: 2, name: 'view users', router: 'view'}
  ];
  bugButtonContainers = [
    {id: 1, name: 'create bug', router: 'create'},
    {id: 2, name: 'view bugs', router: 'view'}
  ];
  permissionButtonContainers = [
    {id: 1, name: 'edit', router: 'edit'}
  ];

  currentUserButton = false;
  currentBugButton = false;
  currentPermButton = false;

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

  activePermButton() {
    if (this.currentPermButton === true) {
      this.currentPermButton = false;
    } else {
      this.currentPermButton = true;
    }
  }

  userButtonDisable() {
    if (this.storageService.userHasPermission(PermissionType.USER_MANAGEMENT)) {
      this.disableUser = false;
    }
  }

  bugButtonDisable() {
    if (this.storageService.userHasPermission(PermissionType.BUG_MANAGEMENT)) {
      this.disableUser = false;
    }
  }

  permissionButtonDisable() {
    if (this.storageService.userHasPermission(PermissionType.PERMISSION_MANAGEMENT)) {
      this.disableUser = false;
    }
  }

//log out
  atLogout() {
    this.storageService.atLogout();
    this.router.navigate(['/login']);
  }


}
