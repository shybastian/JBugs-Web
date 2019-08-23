import {Injectable} from '@angular/core';
import {BackendService} from '../../core/backend/services/backend.service';
import {Observable} from 'rxjs';
import {Bug} from "../model/bug.model";
import {Attachment} from "../model/attachment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private baseUrl = 'http://localhost:8080/jbugs/api/bugs';
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type' : 'multipart/form-data',
  //     })
  // };

  constructor(private backendService: BackendService, private http: HttpClient) {
  }

  submitBug(bug: Bug, attachment: Attachment, file: File) {

    const bugJSON = JSON.stringify(bug);
    console.log(bugJSON);
    // this.backendService.post(this.baseUrl, bugJSON).subscribe(success => {
    //     if (success.Result) {
    //       console.log(success.toString());
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   });

    this.backendService.post(this.baseUrl, bugJSON).subscribe(data => {
      console.log('THIS IS THE BUG YOU GET BACK FROM THE SERVER', data);
      this.submitAttachment(data, attachment, file);
    });
  }

  submitAttachment(bug: Bug, attachment: Attachment, file: File): void {

    let formData = new FormData();

    formData.append('ID', attachment.ID.toString());
    formData.append('attContent', file, file.name);
    formData.append('bugID', bug.ID.toString());
    //formData.append('attContent', file, file.name );
    //formData.append('attContent', file);
    //formData.append('bugID')

    //attachment.attContent = formData;

    //let reader = new FileReader();
    //reader.readAsArrayBuffer(file);
    //reader.readAsBinaryString(file);
    //reader.readAsText(file);

    // reader.onload = (e) => {
    //   attachment.attContent = reader.result;
    // };

    //let attachmentBlob = new Blob([file, file.name]);
    //attachment.attContent = formData;

    //attachment.bugID = bug;

    console.log('THIS IS THE ATTACHMENT', formData);
    //console.log(this.httpOptions);

    var headers = new HttpHeaders();
    headers.append('Header1', 'Content-Type: multipart/form-data');

    // this.backendService.post('http://localhost:8080/jbugs/api/attachments', formData).subscribe(success => {
    //     if (success.Result) {
    //       console.log(success.toString());
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   });

    console.log(headers);

    this.http.post('http://localhost:8080/jbugs/api/attachments/upload', formData, {headers}).subscribe(success => {
        if (success) {
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
