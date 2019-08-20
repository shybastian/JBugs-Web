import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';
import {LoginData} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private backendService: BackendService) {
  }

  loginGetUser(username: string, hashedPassword: string): Observable<any> {
    const loginData: LoginData = {
      username,
      password: hashedPassword
    };
    return this.backendService.post('http://localhost:8080/jbugs/api/login', loginData);
  }
}
