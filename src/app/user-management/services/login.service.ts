import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';
import {LoginData, UserToSaveOnSession} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../login/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private storageService: StorageService,
              private backendService: BackendService, private http: HttpClient) {
  }

  loginGetUser(username: string, password: string): Observable<UserToSaveOnSession> {
    const loginData: LoginData = {
      username,
      password
    };

    // not using backend service since it filters for auth header (token), which is not yet generated
    return this.http.post<UserToSaveOnSession>('http://localhost:8080/jbugs/api/login', loginData);
  }
}
