import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';
import {LoginData, UserToSaveOnSession} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private backendService: BackendService) {
  }

  loginGetUser(username: string, password: string): Observable<UserToSaveOnSession> {
    const loginData: LoginData = {
      username,
      password
    };
    return this.backendService.post('http://localhost:8080/jbugs/api/login', loginData);
  }
}
