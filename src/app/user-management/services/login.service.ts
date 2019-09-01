import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';
import {LoginData, UserToSaveOnSession} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../login/services/storage.service';
import {catchError, retry} from "rxjs/operators";

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
    return this.http.post<UserToSaveOnSession>('http://localhost:8080/jbugs/api/login', loginData).pipe(
      retry(0),
      catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }



}
