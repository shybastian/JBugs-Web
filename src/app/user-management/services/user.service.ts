import {Injectable} from '@angular/core';
import {RoleWrapper, User, UserEditWrapper, UserInsertWrapper} from '../models/user.model';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService) {
  }

  getAllUsers(): Observable<User[]> {
    return this.backendService.get(' http://localhost:8080/jbugs/api/users');
  }

  getUser(id: number): Observable<UserEditWrapper> {
    return this.backendService.get(' http://localhost:8080/jbugs/api/users/' + id);
  }

  checkDeactivation(id: number): Observable<boolean> {
    return this.backendService.get(' http://localhost:8080/jbugs/api/users/is-deactivatable/' + id);
  }

  addUser(firstname: string, lastname: string, phone: string, mail: string, roleList: RoleWrapper[]): Observable<UserInsertWrapper> {
    const user: UserInsertWrapper = {
      firstName: firstname,
      lastName: lastname,
      email: mail,
      mobileNumber: phone,
      roles: roleList
    };
    return this.backendService.post(' http://localhost:8080/jbugs/api/users/create-user', user);
  }

  editUser(user: UserEditWrapper): Observable<UserEditWrapper> {
    debugger;
    return this.backendService.put(' http://localhost:8080/jbugs/api/users/edit-user', user);
  }
}
