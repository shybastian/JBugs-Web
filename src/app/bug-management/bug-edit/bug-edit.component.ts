import {Component, OnInit} from '@angular/core';
import {BugService} from "../services/bug.service";
import {DynamicDialogConfig, DynamicDialogRef, SelectItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {BugModel} from "../model/bug.model";
import {NgForm} from "@angular/forms";
import {StorageService} from "../../user-management/login/services/storage.service";
import {User} from "../../user-management/models/user.model";
import {Attachment, AttachmentView} from "../model/attachment.model";
import {BugAttachmentWrapper} from "../model/BugAttachmentWrapper";
import {AttachmentService} from "../services/attachment.service";

@Component({
  selector: 'app-bug-edit',
  templateUrl: './bug-edit.component.html',
  styleUrls: ['./bug-edit.component.scss']
})
export class BugEditComponent implements OnInit {
  private bug: BugModel;
  private listOfUsers: User[];
  private todayDate = new Date();
  private selectedStatus: SelectItem={label:"", value:""};
  private bugAttachments: string[];
  private attachments: AttachmentView[];

  statusOpen: SelectItem[];
  statusInProgress: SelectItem[];
  statusRejected: SelectItem[];
  statusFixed: SelectItem[];
  statusInfoNeeded: SelectItem[];
  newStatusValues: SelectItem[] = [];
  statusTypes: SelectItem[];

  attachment: Attachment;

  noStatusAvailable: boolean;

  constructor(private bugService: BugService, private attachmentService: AttachmentService, private ref: DynamicDialogRef,
              private config: DynamicDialogConfig, private translateService: TranslateService,
              private storageService: StorageService) {
  }

  /**
   * Initializes the component with the details received from the {@link BugViewComponent}.
   */
  ngOnInit() {
    this.bug = this.config.data[0];
    this.bug.ID = this.config.data[1];
    this.bug.CREATED_ID = this.config.data[2];
    this.bug.ASSIGNED_ID = this.config.data[3];
    this.listOfUsers = this.config.data[4];
    this.bugAttachments = this.config.data[5];
    this.attachments = this.config.data[6];

    this.statusTypes = [
      {label: 'Open', value: 'OPEN'},
      {label: 'Rejected', value: 'REJECTED'},
      {label: 'InfoNeeded', value: 'INFO_NEEDED'},
      {label: 'Fixed', value: 'FIXED'},
      {label: 'In progress', value: 'IN_PROGRESS'}
    ];

    this.statusOpen = [
      {label: "[Select status]", value: "[Select status]"},
      {label: 'In progress', value: 'IN_PROGRESS'},
      {label: 'Rejected', value: 'REJECTED'}
    ];

    this.statusInProgress = [
      {label: "[Select status]", value: "[Select status]"},
      {label: 'Rejected', value: 'REJECTED'},
      {label: 'InfoNeeded', value: 'INFO_NEEDED'},
      {label: 'Fixed', value: 'FIXED'}
    ];

    this.statusRejected = [
      {label: "[Select status]", value: "[Select status]"},
    ];

    this.statusFixed = [
      {label: "[Select status]", value: "[Select status]"},
      {label: 'Open', value: 'OPEN'},
    ];

    this.statusInfoNeeded = [
      {label: "[Select status]", value: "[Select status]"},
      {label: 'In progress', value: 'IN_PROGRESS'}
    ];
  }

  /**
   * Creates the wrapper and sends it to the server.
   * @param editBugForm - not used for anything, just there to submit the form.
   */
  editBug(editBugForm: NgForm) {

    this.attachment = this.createAttachmentEntity();
    console.log(this.attachment);
    console.log(this.bug);
    let wrapperWithAtt: BugAttachmentWrapper = {
      bug: this.bug,
      attachment: this.attachment,
      token: this.storageService.getToken(),
    };

    console.log(wrapperWithAtt)

   if(this.selectedStatus.value === "[Select status]" ){
      alert(this.translateService.instant("UPDATE.NO_GOOD_STATUS"));
    }
    else {
     for(let s of this.statusTypes)
      {
        if(s.value === this.selectedStatus.value)
        {
          this.bug.status = s.value;
          break;
        }

      }
      this.bugService.updateBug(wrapperWithAtt).subscribe((data: any) => {
        if (data === "OK") {
          alert(this.translateService.instant("UPDATE.SUCCESS_UPDATE"));
          this.newStatusValues = [];
          this.ref.close(wrapperWithAtt.bug);
        }
        if (data === "ERROR") {
          alert(this.translateService.instant("BUG_UPDATE.ALERT_BUG_ERROR"));
        }
        this.ref.close(wrapperWithAtt.attachment);
      })
    }
  }

  selectStatus() {

    this.noStatusAvailable = false;
    if (this.bug.status === 'OPEN') {
      this.newStatusValues = this.statusOpen;
    }
    if (this.bug.status === 'IN_PROGRESS') {
      this.newStatusValues = this.statusInProgress;
    }

    if (this.bug.status === 'REJECTED') {
      this.noStatusAvailable = true;
    }

    if (this.bug.status === 'FIXED') {
      this.newStatusValues = this.statusFixed;
    }

    if (this.bug.status === 'INFO_NEEDED') {
      this.newStatusValues = this.statusInfoNeeded;
    }

    if(this.bug.status === 'CLOSED'){
      this.noStatusAvailable = true;
    }
  }

  attContent: string;
  createAttachmentEntity(): Attachment {
    let attachmentToCreate: Attachment = {
      ID: 0,
      attContent: this.attContent,
      bugID: this.bug
    };
    return attachmentToCreate
  }

  log(value){
    this.attContent = value;
  }

  deleteAttachment(attachment){
    console.log(attachment);
    console.log(this.bugAttachments)
    for(let att of this.attachments){
      if(attachment == att.attContent && this.bug.ID == att.bugID.id)
      {
        console.log(att);
        console.log(this.bug);
        console.log(att.id);

        let indexOfDeleted = this.bugAttachments.indexOf(attachment);
        if(indexOfDeleted != -1){
          this.bugAttachments.slice(indexOfDeleted, 1);
        }

        this.attachmentService.deleteAttachment(att.id).subscribe((data: any) => {
          if(data === "OK"){
            alert("Attachment deleted!");
          }
          else if (data === "ERROR") {
            alert("Error");
          }
        })
      }
    }
  }
}
