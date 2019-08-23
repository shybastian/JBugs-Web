import {Injectable} from '@angular/core';
import {BackendService} from "../../core/backend/services/backend.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PermissionDTO} from "../models/permission.model";
import {RoleWrapper} from "../../user-management/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private backendService: BackendService, private httpClient: HttpClient) {
  }

  getRolePermissions(role: RoleWrapper): Observable<PermissionDTO[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/roles/get-permissions/' + role.id);
  }
}
