import {Injectable} from '@angular/core';
import {RoleWrapper, User, UserInsertWrapper} from '../models/user.model';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService, private httpClient: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.backendService.get(' http://localhost:8080/jbugs/api/users');
  }

  addUser(firstname: string, lastname: string, phone: string, mail: string, roleList: RoleWrapper[]): Observable<UserInsertWrapper> {
    const user: UserInsertWrapper = {
      firstName: firstname,
      lastName: lastname,
      email: mail,
      mobileNumber: phone,
      roles: roleList
    };
    return this.backendService.post(' http://localhost:8080/jbugs/api/users', user);
  }
}
