import {Injectable} from '@angular/core';
import {BackendService} from '../../core/backend/services/backend.service';
import {Observable} from 'rxjs';
import {Bug} from '../model/bug.model';
import {StorageService} from "../../user-management/login/services/storage.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private backendService: BackendService, private storageService:StorageService, private http: HttpClient) {
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

  updateBug(newStatus: string, bugID: number): Observable<Bug>{
    console.log("From update:" + newStatus);
    console.log("From update:" + bugID);
    return this.backendService.put('http://localhost:8080/jbugs/api/bugs/update-bug-status/' + bugID, newStatus);
    // return this.http.put('http://localhost:8080/jbugs/api/bugs/update-bug-satus/' + bugID, newStatus, {responseType: 'text'}).subscribe((response: any) => {
    //   if (response === 'OK'){
    //     alert('OK');
    //     return
    //   }
    // })
  }
}
