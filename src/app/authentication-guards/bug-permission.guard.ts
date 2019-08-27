import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {StorageService} from "../user-management/login/services/storage.service";
import {Observable} from "rxjs";
import {PermissionType} from "../user-management/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class BugPermissionGuard implements CanActivate {

  constructor(private _router: Router, private _storageService: StorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.bugManagementPermission()) {
      return true;
    } else {
      this._router.navigate(['dashboard']);
      return false;
    }
  }

  private bugManagementPermission(): boolean {
    if (this._storageService.userHasPermission(PermissionType.BUG_MANAGEMENT)) {
      return true;
    }
    return false;
  }

}
