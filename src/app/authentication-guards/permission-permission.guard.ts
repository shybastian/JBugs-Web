import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {StorageService} from "../user-management/login/services/storage.service";
import {Observable} from "rxjs";
import {PermissionType} from "../user-management/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class PermissionPermissionGuard implements CanActivate {

  constructor(private _router: Router, private _storageService: StorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.permissionManagementPermission()) {
      return true;
    } else {
      this._router.navigate(['dashboard']);
      return false;
    }
  }

  private permissionManagementPermission(): boolean {
    if (this._storageService.userHasPermission(PermissionType.PERMISSION_MANAGEMENT)) {
      return true;
    }
    return false;
  }

}
