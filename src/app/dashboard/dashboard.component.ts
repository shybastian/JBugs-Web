import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userButtonContainers = [
    {id: 1, name: 'create user', router: 'create'},
    {id: 2, name: 'view users', router: 'view'}
  ];
  bugButtonContainers = [
    {id: 1, name: 'create bug', router: 'create'},
    {id: 2, name: 'view bugs', router: 'view'}
  ];

  permissionsButtonContainers = [
    {id: 1, name: 'edit permissions', router: 'edit'}
  ];

  currentUserButton = false;
  currentBugButton = false;
  currentPermissionsButton = false;

  constructor() {
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

}
