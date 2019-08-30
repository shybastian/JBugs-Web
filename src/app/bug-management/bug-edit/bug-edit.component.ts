import {Component, OnInit} from '@angular/core';
import {BugService} from "../services/bug.service";
import {DynamicDialogConfig, DynamicDialogRef, SelectItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {BugModel, BugUpdateWrapper} from "../model/bug.model";
import {NgForm} from "@angular/forms";
import {StorageService} from "../../user-management/login/services/storage.service";
import {User} from "../../user-management/models/user.model";

@Component({
  selector: 'app-bug-edit',
  templateUrl: './bug-edit.component.html',
  styleUrls: ['./bug-edit.component.scss']
})
export class BugEditComponent implements OnInit {
  private bug: BugModel;
  private listOfUsers: User[];
  private todayDate = new Date();

  statusOpen: SelectItem[];
  statusInProgress: SelectItem[];
  statusRejected: SelectItem[];
  statusFixed: SelectItem[];
  statusInfoNeeded: SelectItem[];
  newStatusValues: SelectItem[];

  noStatusAvailable: boolean;

  constructor(private bugService: BugService, private ref: DynamicDialogRef, private config: DynamicDialogConfig,
              private translateService: TranslateService, private storageService: StorageService) {
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

    this.statusOpen = [
      {label: "[Select status]", value: ["Select status"]},
      {label: 'In progress', value: 'IN_PROGRESS'},
      {label: 'Rejected', value: 'REJECTED'}
    ];

    this.statusInProgress = [
      {label: "[Select status]", value: ["Select status"]},
      {label: 'Rejected', value: 'REJECTED'},
      {label: 'InfoNeeded', value: 'INFO_NEEDED'},
      {label: 'Fixed', value: 'FIXED'}
    ];

    this.statusRejected = [
      {label: "[Select status]", value: ["Select status"]},
    ];

    this.statusFixed = [
      {label: "[Select status]", value: ["Select status"]},
      {label: 'Open', value: 'OPEN'},
    ];

    this.statusInfoNeeded = [
      {label: "[Select status]", value: ["Select status"]},
      {label: 'In progress', value: 'IN_PROGRESS'}
    ];
  }

  /**
   * Creates the wrapper and sends it to the server.
   * @param editBugForm - not used for anything, just there to submit the form.
   */
  editBug(editBugForm: NgForm) {
    let wrapper: BugUpdateWrapper = {
      bugDTO: this.bug,
      token: this.storageService.getToken()
    };

    console.log(this.bug.status);

    if(this.bug.status === "CLOSED"){
      alert("UPDATE.CLOSED_STATUS_ALERT");
    }
    else if(this.bug.status == "Select status" || this.bug.status == "[No status available]"){
      alert("UPDATE.NO_GOOD_STATUS");
    }
    else {
      this.bugService.updateBug(wrapper).subscribe((data: any) => {
        if (data === "OK") {
          alert(this.translateService.instant("UPDATE.SUCCESS_UPDATE"));
        }
        if (data === "ERROR") {
          alert(this.translateService.instant("UPDATE.ERROR_UPDATE"));
        }
        this.ref.close();
        location.reload();
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
}
