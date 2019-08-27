import {Injectable} from '@angular/core';
import {BackendService} from '../../core/backend/services/backend.service';
import {Observable} from 'rxjs';
import {Bug} from '../model/bug.model';
import {StorageService} from "../../user-management/login/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private backendService: BackendService, private storageService:StorageService) {
  }

  submitBug(bugJSON: string): void {
    this.backendService.post('http://localhost:8080/jbugs/api/bugs', bugJSON);
  }

  getAllBugs(): Observable<Bug[]> {
    let token: String = StorageService.getToken();
    // let headers = new HttpHeaders(
    //   token
    // );
    return this.backendService.get('http://localhost:8080/jbugs/api/bugs', token);
  }

  updateBug(newStatus: string, bugID: number): Observable<number>{
    console.log(newStatus);
    return this.backendService.put('http://localhost:8080/jbugs/api/bugs/update-bug-status/' + bugID, newStatus);
  }
}
