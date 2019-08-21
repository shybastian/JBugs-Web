import {Injectable} from '@angular/core';
import {BackendService} from "../../core/backend/services/backend.service";
import {Observable} from "rxjs";
import {Bug} from "../model/bug.model";

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private base_url: string = "http://localhost:8080/jbugs/api/bugs";

  constructor(private backendService: BackendService) {
  }

  submitBug(bug: Bug): void {
    // this.backendService.post("http://localhost:8080/jbugs/api/bugs", bugJSON);
    this.backendService.post("http://localhost:8080/jbugs/api/bugs", bug);
  }

  getAllBugs(): Observable<Bug[]> {
    return this.backendService.get("http://localhost:8080/jbugs/api/bugs");
  }
}
