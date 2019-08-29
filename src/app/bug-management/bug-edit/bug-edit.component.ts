import {Component, OnInit} from '@angular/core';
import {BugService} from "../services/bug.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/api";
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
    this.bugService.updateBug(wrapper).subscribe((data: any) => {
      if (data === "OK") {
        alert("OK")
      }
      if (data === "ERROR") {
        alert("ERROR")
      }
      this.ref.close()
    })
  }
}
