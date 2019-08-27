import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {StorageService} from "../user-management/login/services/storage.service";

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuard implements CanActivate {

  constructor(private _router: Router, private _storageService: StorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._storageService.isNotLoggedOut()) return true;
    else {
      this._router.navigate(['dashboard']);
      return false;
    }
  }

}
