import {Injectable} from '@angular/core';
import {RoleWrapper, User, UserEditWrapper, UserInsertWrapper} from '../models/user.model';
import {Observable} from 'rxjs';
import {BackendService} from '../../core/backend/services/backend.service';
import {Notification} from "../../notifications-management/models/notification.model";
import {StorageService} from "../login/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService, private storageService: StorageService) {
    this._alreadyLoggedInUser = false;
  }

  private _alreadyLoggedInUser: boolean;

  get alreadyLoggedInUser(): boolean {
    return this._alreadyLoggedInUser;
  }

  set alreadyLoggedInUser(value: boolean) {
    this._alreadyLoggedInUser = value;
  }

  /**
   * This method reguests all the users from the database
   *    from the server, sending a GET request
   * It wraps the data returned in the response in a list of User objects
   *    and returns an observable
   */
  getAllUsers(): Observable<User[]> {
    return this.backendService.get(' http://localhost:8080/jbugs/api/users');
  }

  /**
   * This method reguests a user having the specified id
   *    from the server, sending a GET request
   * It wraps the data returned in the response in a UserEditWrapper object
   *    and returns an observable
   */
  getUser(id: number): Observable<UserEditWrapper> {
    return this.backendService.get(' http://localhost:8080/jbugs/api/users/' + id);
  }

  /**
   * This method reguests a boolean response from the server
   *    regarding the deactivation option for the user having the specified id
   * Sends a GET request
   * It wraps the data returned in the response and returns an observable
   */
  checkDeactivation(id: number): Observable<boolean> {
    return this.backendService.get(' http://localhost:8080/jbugs/api/users/is-deactivatable/' + id);
  }

  /**
   * This method reguests the server to add a new user in the database
   * It wraps the user data received as parameters in a UserInsertWrapper Object
   *    and sends it in a POST request
   * It wraps the data returned in the response in a UserInsertWrapper object
   *    and returns an observable
   */
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

  /**
   * This method reguests the server to update a user in the database
   * It sends a PUT request and adds the UserEditWrapper object received as
   *    parameter in the request body
   * It wraps the data returned in the response in a UserEditWrapper object
   *    and returns an observable
   */
  editUser(user: UserEditWrapper): Observable<UserEditWrapper> {
    let body = {
      "user": user,
      "usernameUpdater": this.storageService.getUserWithoutIdRolesCounterStatusFromSessionStorage().username
    }
    return this.backendService.put(' http://localhost:8080/jbugs/api/users/edit-user', body);
  }

  /**
   * This method reguests an array of notifications corresponding to the user having
   *    the specified username from the server, sending a GET request
   * It wraps the data returned in the response in a Notification object array
   *    and returns an observable
   */
  getUserNotifications(username: string): Observable<Notification[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/users/' + username + '/notifications');
  }

  getUserTodayNotifications(username: string): Observable<Notification[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/users/' + username + '/notifications/day');
  }

  getUserNewNotifications(username: string, lastNotificationId: number): Observable<Notification[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/users/' + username + '/notifications/' + lastNotificationId);
  }
}
