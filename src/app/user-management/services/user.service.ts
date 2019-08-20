import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
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
}
