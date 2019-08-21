import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';
import {LoginData, PermissionType, User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private backendService: BackendService) {
  }

  updateSessionStorage(user: User) {
    sessionStorage.clear();
    sessionStorage.setItem('user_id', '' + user.id);
    sessionStorage.setItem('user_firstName', '' + user.firstName);
    sessionStorage.setItem('user_lastName', '' + user.lastName);
    sessionStorage.setItem('user_username', '' + user.username);
    sessionStorage.setItem('user_email', '' + user.email);
    sessionStorage.setItem('user_mobileNumber', '' + user.mobileNumber);
    sessionStorage.setItem('user_status', '' + user.status);

    let permissionIndex = 0;
    for (const role of user.roles) {
      for (const index in role.permissions) {
        sessionStorage.setItem('user_permission_' + permissionIndex, '' + role.permissions[index].type);
        permissionIndex++;
      }
      sessionStorage.setItem('user_nr_permissions', '' + permissionIndex);
    }
  }

  getUserWithoutPermissionsFromSessionStorage() {
    let user: User;
    user.id = +sessionStorage.getItem('user_id');
    user.firstName = sessionStorage.getItem('user_firstName');
    user.lastName = sessionStorage.getItem('user_lastName');
    user.username = sessionStorage.getItem('user_username');
    user.email = sessionStorage.getItem('user_email');
    user.mobileNumber = sessionStorage.getItem('user_mobileNumber');
    user.status = +sessionStorage.getItem('user_status');
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

  loginGetUser(username: string, hashedPassword: string): Observable<LoginData> {
    let loginData: LoginData;
    loginData = {
      username,
      hashedPassword
    };
    return this.backendService.post('http://localhost:8080/jbugs/api/login', loginData);
  }
}
