import {Injectable} from '@angular/core';
import {BackendService} from '../../core/backend/services/backend.service';
import {Observable} from 'rxjs';
import {Bug} from '../model/bug.model';
import {HttpClient} from "@angular/common/http";
import {BugAttachmentWrapper} from "../model/BugAttachmentWrapper";
import {StorageService} from "../../user-management/login/services/storage.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private baseUrl = 'http://localhost:8080/jbugs/api/bugs';

  constructor(private backendService: BackendService, private http: HttpClient, private storageService: StorageService,
              private translateService: TranslateService) {
  }

  /**
   *
   * @param wrapper is an {@link BugAttachmentWrapper} object that contains
   * both the {@link Bug} & {@link Attachment} objects.
   */
  submitBug(wrapper: BugAttachmentWrapper) {
    this.http.post(this.baseUrl, wrapper, {responseType: 'text'}).subscribe((response: any) => {
      if (response === "OK") {
        alert(this.translateService.instant("BUG-CREATE.ALERT_BUG_ADDED"));
      } else if (response === "ERROR") {
        alert(this.translateService.instant("BUG-CREATE.ALERT_BUG_ERROR"))
      } else alert(response);
    });
  }
  getAllBugs(): Observable<Bug[]> {
    let token: String = StorageService.getToken();
    // let headers = new HttpHeaders(
    //   token
    // );
    return this.backendService.get('http://localhost:8080/jbugs/api/bugs', token);
  }

  // updateBug(newStatus: string, bugID: number): Observable<Bug>{
  //   console.log("From update:" + newStatus);
  //   console.log("From update:" + bugID);
  //   // let updateData: updateData ={
  //   //   type: newStatus
  //   // }
  //   return this.backendService.put('http://localhost:8080/jbugs/api/bugs/update-bug-status/' + bugID, newStatus);
  // }

  updateBug(newStatus: string, bugID: number){
    console.log("From update:" + newStatus);
    console.log("From update:" + bugID);
    this.http.put(this.baseUrl + "/update-bug-status/" + bugID, newStatus, {responseType: 'text'}).subscribe((response: any) => {
      if (response === "OK") {
        alert(this.translateService.instant("UPDATE_STATUS.SUCCESS_UPDATE"));
      } else if (response === "ERROR") {
        alert(this.translateService.instant("UPDATE_STATUS.ERROR_UPDATE"))
      } else alert(response);
    });
  }
}
