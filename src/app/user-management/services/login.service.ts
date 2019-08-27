import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';
import {LoginData, UserToSaveOnSession} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private backendService: BackendService) {
  }

  loginGetUser(username: string, password: string): Observable<UserToSaveOnSession> {
    const loginData: LoginData = {
      username,
      password
    };

    // not using backend service since it filters for auth header (token), which is not yet generated
    return this.http.post<any>('http://localhost:8080/jbugs/api/login', loginData);
    // return this.backendService.post('http://localhost:8080/jbugs/api/login', loginData);
  }
}
