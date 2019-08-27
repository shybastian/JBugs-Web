import {PermissionType, User, UserToSaveOnSession} from '../../models/user.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private someoneIsLoggedIn: boolean = false;

  isNotLoggedOut(): boolean {
    return sessionStorage.getItem("token") != null;
  }

  atLogout() {
    sessionStorage.clear();
    this.someoneIsLoggedIn = false;
  }

  atLogin(user: UserToSaveOnSession) {
    this.updateSessionStorageWithUser(user);
    this.someoneIsLoggedIn = true;
  }

  isSomeoneLoggedIn(): boolean {
    return this.someoneIsLoggedIn;
  }

  getToken(): string {

    if (!this.isSomeoneLoggedIn()) {
      return '';
    }

    return sessionStorage.getItem('token');
  }

  updateSessionStorageWithUser(user: UserToSaveOnSession) {
    if (!this.isSessionStorageAvailable()) {
      alert('session storage not available. Try using another browser or opening another tab :)');
    } else {
      sessionStorage.clear();
      sessionStorage.setItem('token', user.token);

      sessionStorage.setItem('user_firstName', '' + user.firstName);
      sessionStorage.setItem('user_lastName', '' + user.lastName);
      sessionStorage.setItem('user_username', '' + user.username); // also encoded in TOKEN
      sessionStorage.setItem('user_email', '' + user.email);
      sessionStorage.setItem('user_mobileNumber', '' + user.mobileNumber);

      let permissionIndex = 0;
      for (const index in user.permissions) {
        sessionStorage.setItem('user_permission_' + permissionIndex, '' + user.permissions[index]);
        permissionIndex++;
      }
      sessionStorage.setItem('user_nr_permissions', '' + permissionIndex);
    }
  }

  getUserWithoutIdRolesCounterStatusFromSessionStorage(): User {
    let user: User = {
      id: 0,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      mobileNumber: '',
      password: '',
      status: 0,
      stringStatus: '',
      counter: 0,
      roles: []
    };

    user.firstName = sessionStorage.getItem('user_firstName');
    user.lastName = sessionStorage.getItem('user_lastName');
    user.username = sessionStorage.getItem('user_username');
    user.email = sessionStorage.getItem('user_email');
    user.mobileNumber = sessionStorage.getItem('user_mobileNumber');

    return user;
  }

  getUserWithoutPermissionsFromSessionStorage(): UserToSaveOnSession {
    let user: UserToSaveOnSession = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      mobileNumber: '',
      permissions: [],
      messageCode: '',
      token: ''
    };

    user.firstName = sessionStorage.getItem('user_firstName');
    user.lastName = sessionStorage.getItem('user_lastName');
    user.username = sessionStorage.getItem('user_username');
    user.email = sessionStorage.getItem('user_email');
    user.mobileNumber = sessionStorage.getItem('user_mobileNumber');

    return user;
  }
  getPermissionsFromSessionStorage(): PermissionType[] {
    const nrPermissions = +sessionStorage.getItem('user_nr_permissions');
    const permissions: PermissionType[] = new Array(nrPermissions);

    for (let permissionIndex = 0; permissionIndex < nrPermissions; permissionIndex++) {
      permissions[permissionIndex] = PermissionType[sessionStorage.getItem('user_permission_' + permissionIndex)];
    }
    return permissions;
  }

  userHasPermission(p: PermissionType): boolean {
    const permissions = this.getPermissionsFromSessionStorage();
    for (let permission of permissions) {
      if (permission === p) {
        return true;
      }
    }
    return false;
  }

  isSessionStorageAvailable() {
    if (this.isStorageAvailable('sessionStorage')) {
      return true;
    } else {
      return false;
    }
  }

  isStorageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
  }

}
