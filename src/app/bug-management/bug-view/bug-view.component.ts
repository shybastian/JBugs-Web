import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {BugService} from '../services/bug.service';
import {UserService} from '../../user-management/services/user.service';
import {User} from '../../user-management/models/user.model';
import {Bug} from '../model/bug.model';
import {DatePipe} from "@angular/common";
import {Table} from "primeng/table";
import {BugView} from "../model/bug-view.model";

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss']
})
export class BugViewComponent implements OnInit, AfterViewInit {

  constructor(private bugService: BugService, private userService: UserService, private datePipe: DatePipe) {

  }

  public bugsView: BugView[] = [];

  public bugs: Bug[] = [];

  public users: User[];

  columns: any[];

  severityFilter: SelectItem[];

  statusFilter: SelectItem[];

  userFilter: SelectItem[];

  versionFilter: SelectItem[];

  display = false;

  selectedBug1: BugView;

  @ViewChild('dt', {static: true})
  dt: Table;

  log(value){
    console.log(value);
  }

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
      {label: 'Low', value: 'low'},
      {label: 'Medium', value: 'medium'},
      {label: 'High', value: 'high'},
      {label: 'Critical', value: 'critical'}
    ];

    this.statusFilter = [
      {label: 'New', value: 'New'},
      {label: 'In progress', value: 'In Progress'},
      {label: 'Fixed', value: 'Fixed'},
      {label: 'Closed', value: 'Closed'},
      {label: 'Rejected', value: 'Rejected'},
      {label: 'Info needed', value: 'Info needed'}
    ];

    this.versionFilter = [
      {label: 'All', value: ''},
      {label: '1 - 1.9', value: '1'},
      {label: '2 - 2.9', value: '2'}
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

      this.dt.filterConstraints['dateFilter'] = function inCollection(value: any, filter: any): boolean {
        console.log(value);
        console.log("Filter: " + new DatePipe('en').transform(filter, 'yyyy-MM-dd'));

        if (filter === undefined || filter === null || (filter.length === 0 || filter === "") && value ===null ){
          return true;
        }

        if (value === undefined || value === null || value.length === 0) {
          return false;
        }

        if(value == new DatePipe('en').transform(filter, 'yyyy-MM-dd')){
          return true;
        }

        return false;
      }
    });

    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      for (let i = 0; i < users.length; i ++) {
        console.log({label: this.users[i].username, value: this.users[i].username});
        this.userFilter.push({label: this.users[i].username, value: this.users[i].username});
      }
    });
  }

  show() {
    this.display = true;
  }

  targetDateColumn(value){
    return value === "targetDate";
  }

}
