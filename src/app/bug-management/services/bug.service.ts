import {Injectable} from '@angular/core';
import {BackendService} from '../../core/backend/services/backend.service';
import {Observable} from 'rxjs';
import {Bug} from '../model/bug.model';
import {UpdateStatusData} from "../model/bug-view.model";

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private backendService: BackendService) {
  }

  submitBug(bugJSON: string): void {
    this.backendService.post('http://localhost:8080/jbugs/api/bugs', bugJSON);
  }

  getAllBugs(): Observable<Bug[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/bugs');
  }

  updateBug(newStatus: string, bugID: number): Observable<number>{
    const updateData : UpdateStatusData = {
      status: newStatus,
      bugID: bugID
    };

    return this.backendService.put('http://localhost:8080/jbugs/api/bugs/update-bug-status/' + bugID, newStatus);
  }
}
