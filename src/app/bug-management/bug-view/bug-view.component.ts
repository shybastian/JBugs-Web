import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {BugService} from '../services/bug.service';
import {UserService} from '../../user-management/services/user.service';
import {User} from '../../user-management/models/user.model';
import {Bug} from '../model/bug.model';
import {DatePipe} from "@angular/common";
import {Table} from "primeng/table";
import {BugView} from "../model/bug-view.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss']
})
export class BugViewComponent implements OnInit, AfterViewInit {

  constructor(private bugService: BugService, private userService: UserService, private datePipe: DatePipe,
              private translateService: TranslateService) {

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

  /**
   * Used for displaying de info pop-up
   */
  display = false;

  /**
   * The values from a selected row
   */
  selectedBug1: BugView;

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
      {label: 'Info needed', value: 'INFO_NEEDED'}
    ];

    this.versionFilter = [
      {label: 'All', value: ''}
    ];

    this.fixedVersionFilter = [
      {label: 'All', value: ''}
    ];

  }

  ngAfterViewInit(){

    this.bugService.getAllBugs().subscribe(bugs => {
      this.bugs = bugs;
      console.log(this.bugs);
      for (let i = 0; i < this.bugs.length; i++) {
        console.log(this.bugs[i].targetDate);
        this.bugsView.push({
          id: this.bugs[i].ID,
          title: this.bugs[i].title,
          description: this.bugs[i].description,
          version: this.bugs[i].version,
          targetDate: this.datePipe.transform(new Date(this.bugs[i].targetDate), 'yyyy-MM-dd'),
          status: this.bugs[i].status,
          fixedVersion: this.bugs[i].fixedVersion,
          severity: this.bugs[i].severity,
          created_ID: this.bugs[i].CREATED_ID.username,
          assigned_ID: this.bugs[i].ASSIGNED_ID.username
        })
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

    console.log(maxVersion + " " + maxFixedVersion);

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

      if (filter === undefined || filter === null || (filter.length === 0 || filter === "") && value ===null ){
        return true;
      }

      if (value === undefined || value === null || value.length === 0) {
        return false;
      }

      return value == new DatePipe('en').transform(filter, 'yyyy-MM-dd');
    };

  }

  /**
   * Function to display Info pop-up
   */
  show() {
    this.display = true;
  }

  /**
   * Verify if column is targetDate in order to place clearDate button
   * @param value - column name
   */
  targetDateColumn(value){
    return value === "targetDate";
  }

  bugAsString():void{
    this.selectedBug = this.selectedBug1;
  }

}
