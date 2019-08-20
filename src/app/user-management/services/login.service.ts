import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private backendService: BackendService) {
  }

  isGoodCaptcha(): boolean {
    return true;
  }

  loginGetUser(): Observable<string> { // User
    return this.backendService.get('http://localhost:8080/myapp/users');
  }
}
