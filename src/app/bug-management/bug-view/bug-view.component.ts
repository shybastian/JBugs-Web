import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {BugService} from '../services/bug.service';
import {UserService} from '../../user-management/services/user.service';
import {User} from '../../user-management/models/user.model';
import {Bug} from '../model/bug.model';
import {DatePipe} from '@angular/common';
import {Table} from 'primeng/table';
import {BugView} from '../model/bug-view.model';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss']
})
export class BugViewComponent implements AfterViewInit, OnInit, AfterViewInit {

  constructor(private bugService: BugService, private userService: UserService, private datePipe: DatePipe,
              private translate: TranslateService) {

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
  displayUpdateModal = false;

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
  selectedBug: BugView = {
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
      {label: 'All', value: ''}
    ];

    this.fixedVersionFilter = [
      {label: 'All', value: ''}
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
      {label: "[Select status]", value: ["Select status"]},
      {label: 'Closed', value: 'CLOSED'}
    ];

    this.statusFixed = [
      {label: "[Select status]", value: ["Select status"]},
      {label: 'Open', value: 'OPEN'},
      {label: 'Closed', value: 'CLOSED'}
    ];

    this.statusInfoNeeded = [
      {label: "[Select status]", value: ["Select status"]},
      {label: 'In progress', value: 'IN_PROGRESS'}
    ];
  }

  ngAfterViewInit() {

    this.bugService.getAllBugs().subscribe(bugs => {
      this.bugs = bugs;
      console.log(bugs);
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

      this.constructVersionFilters(this.bugs);
      this.constructUserFiler();
      this.constructDateFilter();
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

  constructUserFiler(){
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      for (let i = 0; i < users.length; i ++) {
        this.userFilter.push({label: this.users[i].username, value: this.users[i].username});
      }
    });
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
      this.newStatusValues = [];
    }

  }

  modifyBugStatus(newStatus) {

    console.log("From modify: " + newStatus);

    if (newStatus === "CLOSED") {
      alert(this.translate.instant("UPDATE_STATUS.CLOSED_STATUS_ALERT"))
    } else {
      this.bugService.updateBug(newStatus, this.selectedBug.id);
        // .subscribe((data: Bug) => {
        //   console.log(data);
        //   alert(this.translate.instant('UPDATE_STATUS.SUCCESS_UPDATE'));
        //   this.displayUpdateModal = false;
        //   this.displayInfoModal = false;
        //   this.dt.reset();
        // })
    }
  }

  // onChangeHandler(){
  //   console.log(this.selectedStatus);
  // }

  showInfoModal(){
    this.displayInfoModal = true;
  }
}
