import {Injectable} from '@angular/core';
import {BackendService} from '../../core/backend/services/backend.service';
import {Observable} from 'rxjs';
import {BugAttachmentWrapper} from '../model/BugAttachmentWrapper';
import {Bug} from "../model/bug.model";

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private baseUrl = 'http://localhost:8080/jbugs/api/bugs';

  constructor(private backendService: BackendService) {
  }

  submitBug(bugWrapper: BugAttachmentWrapper): void {
    const bugJSON = JSON.stringify(bugWrapper);
    console.log(bugJSON);
    this.backendService.post(this.baseUrl, bugJSON).subscribe(success => {
        if (success.Result) {
          console.log(success.toString());
        }
      },
      error => {
        console.log(error);
      });
  }

  getAllBugs(): Observable<Bug[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/bugs');
  }
}
