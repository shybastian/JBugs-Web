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
export class BugViewComponent implements AfterViewInit, OnInit {

  constructor(private bugService: BugService, private userService: UserService, private datePipe: DatePipe,
               public translate: TranslateService) {

  }

  public bugsView: BugView[] = [];

  public bugs: Bug[] = [];

  public users: User[];

  columns: any[];

  severityFilter: SelectItem[];
  statusFilter: SelectItem[];
  userFilter: SelectItem[];
  versionFilter: SelectItem[];

  displayInfoModal = false;
  displayUpdateModal = false;

  selectedBug1: BugView;
  selectedBugTitle: String="";
  selectedBugId: number = -1;

  statusOpen: SelectItem[];
  statusInProgress: SelectItem[];
  statusRejected: SelectItem[];
  statusFixed: SelectItem[];
  statusInfoNeeded: SelectItem[];
  newStatusValues: SelectItem[];

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

    this.statusOpen = [
      {label: 'In progress', value: 'In progress'},
      {label: 'Rejected', value: 'Rejected'}
    ];

    this.statusInProgress = [
      {label: 'Rejected', value: 'Rejected'},
      {label: 'InfoNeeded', value: 'InfoNeeded'},
      {label: 'Fixed', value: 'Fixed'}
    ];

    this.statusRejected = [
      {label: 'Closed', value: 'Closed'}
    ];

    this.statusFixed = [
      {label: 'Open', value: 'Open'},
      {label: 'Closed', value: 'Closed'}
    ];

    this.statusInfoNeeded = [
      {label: 'In progress', value: 'In progress'}
    ];

  }

  ngAfterViewInit(){


    this.bugService.getAllBugs().subscribe(bugs => setTimeout( () => {
      this.bugs = bugs;
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
        })
      }

      this.dt.filterConstraints['dateFilter'] = function inCollection(value: any, filter: any): boolean {
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
    }, 300));

    this.userService.getAllUsers().subscribe(users => setTimeout(()=>{
      this.users = users;
      for (let i = 0; i < users.length; i ++) {
        this.userFilter.push({label: this.users[i].username, value: this.users[i].username});
      }
    },250));


  }

  showInfoModal() {
    this.displayInfoModal = true;
  }

  showUpdateModal() {
    this.selectedBugTitle = this.selectedBug1.title;
    console.log(this.selectedBugTitle);
    console.log(this.bugs[this.bugsView.indexOf(this.selectedBug1)]);
    this.selectedBugId = this.bugs[this.bugsView.indexOf(this.selectedBug1)].id;
    console.log(this.selectedBugId);

    if(this.selectedBug1.status === "Closed"){
      alert(this.translate.instant('UPDATE_STATUS.CLOSED_STATUS_ALERT'));
    }
      else{
      this.displayUpdateModal = true;
    }

  }

  targetDateColumn(value){
    return value === "targetDate";
  }

  selectStatus() {
    for (let b of this.bugs) {
      if (b.id === this.selectedBugId) {

        if (b.status === 'Open') {
          this.newStatusValues = this.statusOpen;
        }

        if (b.status === 'In progress') {
          this.newStatusValues = this.statusInProgress;
        }

        if (b.status === 'Rejected') {
          this.newStatusValues = this.statusRejected;
        }

        if (b.status === 'Fixed') {
          this.newStatusValues = this.statusFixed;
        }

        if (b.status === 'Info needed') {
          this.newStatusValues = this.statusInfoNeeded;
        }

        if(b.status === 'Closed'){
          this.newStatusValues = [];
        }

      }
    }

  }

  modifyBugStatus(newStatus){
    console.log(this.selectedBugId);

    this.bugService.updateBug(newStatus, this.selectedBugId)
      .subscribe( data => {
        alert(this.translate.instant('UPDATE_STATUS.SUCCESS_UPDATE'));
        this.displayUpdateModal = false;
        this.displayInfoModal = false;
        this.dt.reset();
      }, Error => {
        alert(this.translate.instant('UPDATE_STATUS.ERROR_UPDATE'));
      })

  }

}
