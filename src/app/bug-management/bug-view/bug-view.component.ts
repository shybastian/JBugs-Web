import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {BugService} from '../services/bug.service';
import {UserService} from '../../user-management/services/user.service';
import {PermissionType, User} from '../../user-management/models/user.model';
import {Bug} from '../model/bug.model';
import {DatePipe} from '@angular/common';
import {Table} from 'primeng/table';
import {BugView} from '../model/bug-view.model';
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "../../user-management/login/services/storage.service";
import {BugViewList} from "../model/bug-view-list.model";

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss']
})
export class BugViewComponent implements AfterViewInit, OnInit, AfterViewInit {

  constructor(private bugService: BugService, private userService: UserService, private datePipe: DatePipe,
              private translate: TranslateService, private storageService: StorageService) {

  }

  public bugsView: BugView[] = [];
  public bugs: Bug[] = [];
  public users: User[];

  columns: any[];

  /**
   * The values from the multiSelect and dropdown
   */
  severityFilter: SelectItem[];
  statusFilter: SelectItem[];
  userFilter: SelectItem[];
  versionFilter: SelectItem[];
  fixedVersionFilter: SelectItem[];

  displayInfoModal = false;

  /**
   * The values from a selected row
   */
  selectedBug1: BugView;
  selectedStatus: string;

  statusOpen: SelectItem[];
  statusInProgress: SelectItem[];
  statusRejected: SelectItem[];
  statusFixed: SelectItem[];
  statusInfoNeeded: SelectItem[];
  newStatusValues: SelectItem[];

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
  visibleButton: boolean;

  /**
   * Initializing the values for filters
   */

  ngOnInit(): void {

    this.userFilter = [
      {label: 'All', value: null}
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
      {label: "[Bug can only be closed]", value: ["Bug can only be closed"]},
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

  bugsViewList: BugViewList;

  ngAfterViewInit() {

    this.bugService.getAllBugs().subscribe(bugs => {
      this.bugsViewList = bugs;
      this.bugs = this.bugsViewList.bugDTOList;
      this.users = this.bugsViewList.userDTOList;
      for (let i = 0; i < this.bugs.length; i++) {
        this.bugsView.push({
          id: this.bugs[i].id,
          title: this.bugs[i].title,
          description: this.bugs[i].description,
          version: this.bugs[i].version,
          targetDate: this.datePipe.transform(new Date(this.bugs[i].targetDate), 'yyyy-MM-dd'),
          status: this.bugs[i].status,
          fixedVersion: this.bugs[i].fixedVersion,
          severity: this.bugs[i].severity,
          created_ID: this.bugs[i].created_ID.username,
          assigned_ID: this.bugs[i].assigned_ID.username
        });
      }

      for (let i = 0; i < this.users.length; i ++) {
        this.userFilter.push({label: this.users[i].username, value: this.users[i].username});
      }

      this.constructVersionFilters(this.bugs);
      this.constructDateFilter();
      this.checkPermissionForBugClose();
      this.dt.reset();

    });
  }

  getMaxVersion(bugList: Bug[]): [number, number]{
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

  constructVersionFilters(bugList: Bug[]){
    let maxVersion;
    let maxFixedVersion;
    [maxVersion, maxFixedVersion] = this.getMaxVersion(bugList);

    for(let i = 1; i <= maxVersion; i++){
      this.versionFilter.push({label: i.toString() + ' - ' + i.toString() + '.9', value: i.toString() })
    }

    for(let i = 1; i <= maxFixedVersion; i++){
      this.fixedVersionFilter.push({label: i.toString() + ' - ' + i.toString() + '.9', value: i.toString()})
    }

  }

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
  }

  selectStatus() {

    if (this.selectedBug.status === 'OPEN') {
      this.newStatusValues = this.statusOpen;
    }
    if (this.selectedBug.status === 'IN_PROGRESS') {
      this.newStatusValues = this.statusInProgress;
    }

    if (this.selectedBug.status === 'REJECTED') {
      this.newStatusValues = this.statusRejected;
    }

    if (this.selectedBug.status === 'FIXED') {
      this.newStatusValues = this.statusFixed;
    }

    if (this.selectedBug.status === 'INFO_NEEDED') {
      this.newStatusValues = this.statusInfoNeeded;
    }

    if(this.selectedBug.status === 'CLOSED'){
      this.newStatusValues = [{label: "[No status available]", value:"[No status available]"}];
    }

    //this.selectedStatus = this.newStatusValues[0].value;

  }

  modifyBugStatus(newStatus) {

    console.log("S", this.selectedStatus);
    console.log("N", newStatus);

    if(this.selectedStatus == "Select status" || this.selectedStatus == "[No status available]" || this.selectedStatus == ""
        || this.selectedStatus === undefined){
      alert("Please select a status!");
    }
    else
    if(this.selectedBug.status === "CLOSED"){
      alert(this.translate.instant("UPDATE_STATUS.CLOSED_STATUS_ALERT"));
    }
    else if(this.selectedStatus === "CLOSED" || newStatus === "CLOSED")
    {
      alert(this.translate.instant("UPDATE_STATUS.NO_STATUS_CHANGE"));
    }
    else {
      this.bugService.updateBug(newStatus, this.selectedBug.id);
      location.reload();
    }
  }

  closeBug(){
    console.log("From close", this.selectedBug.id);
    this.bugService.closeBug(this.selectedBug.id);
    location.reload();
  }

  checkPermissionForBugClose(){

    console.log(this.storageService.userHasPermission(PermissionType.BUG_CLOSE));
    console.log("Perms", this.selectedBug1.status);
    //console.log(this.selectedBug.status == "FIXED" || this.selectedBug.status == "REJECTED");
    if(this.storageService.userHasPermission(PermissionType.BUG_CLOSE)) {
        //(this.selectedBug.status == "FIXED" || this.selectedBug.status == "REJECTED")){
      this.visibleButton = true;
    }
    else{
      this.visibleButton = false;
    }

  }


  showInfoModal(){
    this.displayInfoModal = true;
    this.newStatusValues = [];
  }
}
