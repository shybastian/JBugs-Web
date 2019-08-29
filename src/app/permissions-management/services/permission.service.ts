import {Injectable} from '@angular/core';
import {BackendService} from "../../core/backend/services/backend.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PermissionDTO, PermissionsWrapper} from "../models/permission.model";
import {RoleWrapper} from "../../user-management/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private backendService: BackendService, private httpClient: HttpClient) {
  }

  /**
   * This method reguests a list of permissions corresponding to a role
   *    from the server, sending a GET request
   * It wraps the data returned in the response in a list of PermissionDTO objects
   *    and returns an observable
   */
  getRolePermissions(role: RoleWrapper): Observable<PermissionDTO[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/roles/get-permissions/' + role.id);
  }

  /**
   * This method reguests the server to update a role permissions in the database
   * It wraps the new data in a PermissionsWrapper object
   * Returns an observable
   */
  setRolePermissions(role: RoleWrapper, permissions: PermissionDTO[]): Observable<any> {
    const body: PermissionsWrapper = {
      roleId: role.id,
      permissions: permissions
    };
    return this.backendService.put(' http://localhost:8080/jbugs/api/roles/set-permissions', body);
  }
}
