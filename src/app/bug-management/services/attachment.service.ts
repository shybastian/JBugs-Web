import {Injectable} from "@angular/core";
import {BackendService} from "../../core/backend/services/backend.service";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../../user-management/login/services/storage.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {AttachmentView} from "../model/attachment.model";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private baseUrl = 'http://localhost:8080/jbugs/api/attachments';


  constructor(private backendService: BackendService, private http: HttpClient, private storageService: StorageService,
              private translateService: TranslateService) {
  }

  getAttachments(): Observable<AttachmentView[]> {
    let token: string = this.storageService.getToken();
    return this.backendService.get('http://localhost:8080/jbugs/api/attachments', token);
  }

  deleteAttachment(attachmentID: number) {
    console.log("Service", attachmentID)

    let headers = {
      'Authorization': 'Bearer ' + this.storageService.getToken(),
      'Access-Control-Expose-Headers': 'Authorization' };

    let token: string = this.storageService.getToken();
    return this.http.delete(this.baseUrl + '/' + attachmentID, {responseType: 'text', headers: headers});
  }
}
