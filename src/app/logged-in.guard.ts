import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StorageService} from './user-management/login/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {

  constructor(private storageService: StorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;

    if (this.storageService.isSomeoneLoggedIn()) {
      return true;
    }
    return false; // if false, then any sub-path of dashboard not reachable
  }
}
