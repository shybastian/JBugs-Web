import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StorageService} from './user-management/login/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true; // uncomment for testing without LoggedInGuard

    if (this.storageService.isSomeoneLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']).then();
    return false; // if false, then any sub-path of dashboard not reachable
  }
}
