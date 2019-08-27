import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {StorageService} from "../user-management/login/services/storage.service";
import {Observable} from "rxjs";
import {PermissionType} from "../user-management/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserPermissionGuard implements CanActivate {

  constructor(private _router: Router, private _storageService: StorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userManagementPermission()) {
      return true;
    } else {
      this._router.navigate(['dashboard']);
      return false;
    }
  }

  private userManagementPermission(): boolean {
    if (this._storageService.userHasPermission(PermissionType.USER_MANAGEMENT)) {
      return true;
    }
    return false;
  }

}
