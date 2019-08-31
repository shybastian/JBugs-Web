import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DialogService, SelectItem} from 'primeng/api';
import {BugService} from '../services/bug.service';
import {UserService} from '../../user-management/services/user.service';
import {PermissionType, User} from '../../user-management/models/user.model';
import {Bug, BugModel, BugUpdate} from '../model/bug.model';
import {DatePipe} from '@angular/common';
import {Table} from 'primeng/table';
import {BugView} from '../model/bug-view.model';
import {TranslateService} from '@ngx-translate/core';
import {BugEditComponent} from "../bug-edit/bug-edit.component";
import {BugViewList} from "../model/bug-view-list.model";
import {StorageService} from "../../user-management/login/services/storage.service";
import {Attachment} from "../model/attachment.model";

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss'],
  providers: [DialogService],
  styles: ['kendo-pdf-export { font-family: "DejaVu Sans", "Arial", sans-serif; font-size: 12px;}']
})
export class BugViewComponent implements AfterViewInit, OnInit, AfterViewInit {

  constructor(private bugService: BugService, private userService: UserService, private datePipe: DatePipe,
              private translate: TranslateService, private storageService: StorageService,private dialogService: DialogService) {

  }

  public bugsViewList: BugViewList;
  public bugsView: BugView[] = [];
  public bugs: Bug[] = [];
  public users: User[];
  public attachments: Attachment[] = [];

  columns: any[];

  /**
   * The values from the multiSelect and dropdown
   */
  severityFilter: SelectItem[];
  statusFilter: SelectItem[];
  createdByFilter: SelectItem[];
  assignedToFilter: SelectItem[];
  versionFilter: SelectItem[];
  fixedVersionFilter: SelectItem[];

  displayInfoModal = false;
  statusClosed: boolean;
  visibleButton: boolean;

  /**
   * The values from a selected row
   */
  selectedBug1: BugView;
  selectedId: number = 0;

  /**
   * To be initialized with selected row values
   * Values for input text fields in the info pop-up
   */
  selectedBug: BugView =  {
    id: 0,
    title: "",
    description: "",
    version: "",
    targetDate: "",
    status: "",
    fixedVersion: "",
    severity: "",
    created_ID: "",
    assigned_ID: ""
  };
  /**
   * The dataTable used in form ( for dateFilter)
   */
  @ViewChild('dt', {static: true})
  dt: Table;

  user: User;


  /**
   * Initializing the values for filters
   */

  ngOnInit(): void {

    this.createdByFilter = [];

    this.assignedToFilter = [
      {label: 'Not assigned', value: 'Not assigned'},
    ];

    this.columns = [
      {field: 'title', header: 'Title'},
      {field: 'version', header: 'Version'},
      {field: 'targetDate', header: 'Target Date'},
      {field: 'status', header: 'Status'},
      {field: 'fixedVersion', header: 'Fixed in version'},
      {field: 'severity', header: 'Severity'},
      {field: 'created_ID', header: 'Created by'},
      {field: 'assigned_ID', header: 'Assigned to'}
    ];

    this.severityFilter = [
      {label: 'Low', value: 'LOW'},
      {label: 'Medium', value: 'MEDIUM'},
      {label: 'High', value: 'HIGH'},
      {label: 'Critical', value: 'CRITICAL'}
    ];

    this.statusFilter = [
      {label: 'In progress', value: 'IN_PROGRESS'},
      {label: 'Fixed', value: 'FIXED'},
      {label: 'Closed', value: 'CLOSED'},
      {label: 'Rejected', value: 'REJECTED'},
      {label: 'Info needed', value: 'INFO_NEEDED'},
      {label: 'Open', value: 'OPEN'}
    ];

    this.versionFilter = [
      {label: 'All', value: ""},
      {label: 'No version assigned', value: ''}
    ];

    this.fixedVersionFilter = [
      {label: 'All', value: ''},
      {label: 'No version assigned', value: ''}
    ];

    this.bugService.getAttachments().subscribe(atts => {
      console.log(atts);
      this.attachments = atts
      console.log(this.attachments);
    });
  }

  /**
   * Initializes the data that will be displayed into the table and dynamically add data to the filters applied to the
   * "Created by", "Assigned to", "Version", "Fixed version" columns and the custom filter for the date.
   */
  ngAfterViewInit() {

    this.bugService.getAllBugs().subscribe(bugs => {
      this.bugsViewList = bugs;
      this.bugs = this.bugsViewList.bugDTOList;
      this.users = this.bugsViewList.userDTOList;

      let assigned : string;
      for (let i = 0; i < this.bugs.length; i++) {

        /**
         * If the bug was not assigned, the data displayed in the table will be "Not assigned" instead of null
         */
        if(this.bugs[i].assigned_ID.firstName == null)
        {
          assigned = "Not assigned";
        }
        else{
          assigned = this.bugs[i].assigned_ID.firstName + " " + this.bugs[i].assigned_ID.lastName;
        }

        this.bugsView.push({
          id: this.bugs[i].id,
          title: this.bugs[i].title,
          description: this.bugs[i].description,
          version: this.bugs[i].version,
          targetDate: this.datePipe.transform(new Date(this.bugs[i].targetDate), 'yyyy-MM-dd'),
          status: this.bugs[i].status,
          fixedVersion: this.bugs[i].fixedVersion,
          severity: this.bugs[i].severity,
          created_ID: this.bugs[i].created_ID.firstName + " " + this.bugs[i].created_ID.lastName,
          assigned_ID: assigned
        });
      }

      for (let i = 0; i < this.users.length; i ++) {
        let userString = this.users[i].firstName + " " + this.users[i].lastName;
        this.createdByFilter.push({label: userString, value: userString});
        this.assignedToFilter.push({label: userString, value: userString});
      }

      this.constructVersionFilters(this.bugs);
      this.constructDateFilter();
      this.dt.reset();

    });
  }

  getAttachmentsForID(bugID): string{
    let attString: string = "";
    for(let i = 0; i < this.attachments.length; i++){
      if(this.attachments[i].bugID == bugID)
        attString += this.attachments[i].attContent.valueOf() + " ";
    }

    console.log("Att content",attString);
    return attString;
  }

  /**
   * Computes the max integer version from version and fixed version
   * @param bugList the list of bugs that will be displayed into the table
   * @return a list with the maximum from the versions on first position
   *         and the one from the fixed version on the second
   */

  static getMaxVersion(bugList: Bug[]): [number, number]{
    let maxVersion = 0;
    let maxFixedVersion = 0;

    for(let i= 0; i < bugList.length; i++){
      if(parseInt(bugList[i].version) > maxVersion){
        maxVersion = parseInt(bugList[i].version);
      }

      if(parseInt(bugList[i].fixedVersion) > maxFixedVersion){
        maxFixedVersion = parseInt(bugList[i].fixedVersion);
      }
    }

    return [maxVersion, maxFixedVersion];
  }

  /**
   * Adds all the versions from 1 to the maximum of version( same for fixed version) to the filter
   * @param bugList the list of bugs that will be displayed into the table
   */
  constructVersionFilters(bugList: Bug[]){
    let maxVersion;
    let maxFixedVersion;
    [maxVersion, maxFixedVersion] = BugViewComponent.getMaxVersion(bugList);

    for(let i = 1; i <= maxVersion; i++){
      this.versionFilter.push({label: i.toString() + ' - ' + i.toString() + '.9', value: i.toString() })
    }

    for(let i = 1; i <= maxFixedVersion; i++){
      this.fixedVersionFilter.push({label: i.toString() + ' - ' + i.toString() + '.9', value: i.toString()})
    }

  }

  /**
   * Creates the custom date filter for the target date column
   */
  constructDateFilter(){
    this.dt.filterConstraints['dateFilter'] = function inCollection(value: any, filter: any): boolean {

      if (filter === undefined || filter === null || (filter.length === 0 || filter === '') && value === null) {
        return true;
      }

      if (value === undefined || value === null || value.length === 0) {
        return false;
      }

      return value == new DatePipe('en').transform(filter, 'yyyy-MM-dd');
    };
  }

  /**
   * Verify if column is targetDate in order to place clearDate button
   * @param value - column name
   */
  targetDateColumn(value) {
    return value === "targetDate";
  }

  /**
   * Saves the selected row into a variable to be displayed on the info pop-up.
   * Calls the functions that verify if the "Edit" and "Close bug" buttons should be disabled or not
   */
  bugAsString():void{
    this.selectedBug=  {
      id: 0,
      title: "",
      description: "",
      version: "",
      targetDate: "",
      status: "",
      fixedVersion: "",
      severity: "",
      created_ID: "",
      assigned_ID: ""
    };
    this.selectedBug = this.selectedBug1;
    this.checkPermissionForBugClose();
    this.checkStatusClosed();
    this.selectedId = this.selectedBug1.id;
  }

  /**
   * If the "Close bug" button is not disabled and the bug can have the status changed to "Closed".
   * The button will call his function that shows an success response if the status was successfully changed to
   * "Closed" or an error message, if an exception was thrown during the process.
   * The data will automatically be changed in the table without the page reloading.
   */
  closeBug(){
      this.bugService.closeBug(this.selectedBug.id).subscribe((response) =>{
      if (response === "OK") {
        alert(this.translate.instant("UPDATE.CLOSE_BUG_SUCCESS"));
        this.closeBugTable(this.selectedBug);
      } else if (response === "ERROR") {
        alert(this.translate.instant("UPDATE.CLOSE_BUG_ERROR"));
      } else
        alert(response);
    });
    this.visibleButton = false;
  }

  /**
   * This function checks if the user has the permission to close a bug and the bug has the right status to be closed.
   */
  checkPermissionForBugClose(){

    this.visibleButton = this.storageService.userHasPermission(PermissionType.BUG_CLOSE) &&
      (this.selectedBug.status === "FIXED" || this.selectedBug.status === "REJECTED");
  }

  /**
   * Checks if the bug has the status "Closed".
   * The "Edit" button will be disabled is the status of the bug is "Closed".
   */
  checkStatusClosed(){

    this.statusClosed = this.selectedBug.status === "CLOSED";
  }


  /**
   * Function that opens the "Info" pop-up. In order to be able to see the "Info" pop-up the variable displayInfoModal
   * must be true. Otherwise the pop-up will remain closed.
   */
  showInfoModal(){

    this.displayInfoModal = true;
  }

  /**
   * Opens the "Edit" pop-up and prepares the data for the bug that will be edited.
   * If the bug is updated successfully, the data will change into the table without reloading the page.
   */
  showEditBugDialog() {
    let selectedBug: BugUpdate = {
      title: '',
      description: '',
      version: '',
      targetDate: '',
      status: '',
      fixedVersion: '',
      severity: '',
    };
    let id: number;
    let created: User;
    let assigned: User;
    for (let bug of this.bugs) {
      if (bug.id === this.selectedId) {
        selectedBug.description = bug.description;
        selectedBug.title = bug.title;
        selectedBug.version = bug.version;
        selectedBug.targetDate = bug.targetDate;
        selectedBug.status = bug.status;
        selectedBug.fixedVersion = bug.fixedVersion;
        selectedBug.severity = bug.severity;

        id = bug.id;
        created = bug.created_ID;
        assigned = bug.assigned_ID;

        break;
      }
    }
    const ref = this.dialogService.open(BugEditComponent, {
      data: [selectedBug, id, created, assigned, this.users],
      header: this.translate.instant('UPDATE.HEADER'),

      width: '40%'
    });

    ref.onClose.subscribe((bug: BugModel) => {
       if (bug) {

         let bugChanged: Bug = {
           id: bug.ID,
           title: bug.title,
           description: bug.description,
           version: bug.version,
           targetDate: bug.targetDate,
           status: bug.status,
           fixedVersion: bug.fixedVersion,
           severity: bug.severity,
           created_ID: bug.CREATED_ID,
           assigned_ID: bug.ASSIGNED_ID
         };

         for(let i = 0; i< this.bugs.length; i++){
          if(this.bugs[i].id === bugChanged.id)
          {
            this.bugs[i] = bugChanged;
            break;
          }
         }

         console.log(this.bugs);


        let assigned: string = "";
        if(bug.ASSIGNED_ID.firstName == null)
        {
          assigned = "Not assigned";
        }
        else{
          assigned = bug.ASSIGNED_ID.firstName + " " + bug.ASSIGNED_ID.lastName;
        }

        let bugView: BugView = {
          id: bug.ID,
          title: bug.title,
          description: bug.description,
          version: bug.version,
          targetDate: bug.targetDate,
          status: bug.status,
          fixedVersion: bug.fixedVersion,
          severity: bug.severity,
          created_ID: bug.CREATED_ID.firstName + " " + bug.CREATED_ID.lastName,
          assigned_ID: assigned
        };
        this.updateBugTable(bugView);

      }

    }, error => {
      alert(error);
    });
  }

  /**
   * Function that changes the status in "Closed" directly into the table, if the update was successful
   * @param bug is a {@link Bug} whose data needs to be changed;
   */
  closeBugTable(bug: BugView) {
    for (let tableBug of this.bugsView) {
      if (tableBug.id == bug.id) {
        let index = this.bugsView.indexOf(tableBug);
        tableBug = bug;
        tableBug.status = "CLOSED";
        this.bugsView[index] = tableBug;
      }
    }
  }

  /**
   * Updates the data from the table without reloading the page
   * @param bug is a {@link Bug} whose data was updated
   */
  updateBugTable(bug: BugView){
    console.log("From table:", bug);
    for (let tableBug of this.bugsView) {
      if (tableBug.id == bug.id) {
        let index = this.bugsView.indexOf(tableBug);
        tableBug = bug;
        this.selectedBug = bug;
        this.selectedBug1 = bug;
        this.bugsView[index] = tableBug;
      }
    }
  }

}
