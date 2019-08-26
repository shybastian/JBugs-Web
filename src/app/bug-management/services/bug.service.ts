import {Injectable} from '@angular/core';
import {BackendService} from '../../core/backend/services/backend.service';
import {Observable} from 'rxjs';
import {Bug} from '../model/bug.model';
import {Attachment} from "../model/attachment";
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
    this.http.post(this.baseUrl, wrapper).subscribe(data => {
      alert(this.translateService.instant('BUG-CREATE.ALERT_BUG_ADDED'));
    }, error => {
      alert('BUG-CREATE.ALERT_BUG_ERROR');
    });
  }

  getAllBugs(): Observable<Bug[]> {
    return this.backendService.get(this.baseUrl);
  }
}
