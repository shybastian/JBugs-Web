import {Component, OnInit} from '@angular/core';
import {BugView} from "../model/bug-view.model";
import {BugService} from "../services/bug.service";
import {Bug} from "../model/bug.model";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-get-bug-id',
  templateUrl: './get-bug-id.component.html',
  styleUrls: ['./get-bug-id.component.scss']
})
export class GetBugIdComponent implements OnInit {
  columns: any[];
  bugId: number;

  bug: Bug;

  returnedBug: BugView = {
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

  constructor(private bugService: BugService, private datePipe: DatePipe, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(result => {
      console.log("Result ", result);
      this.bugId = +result.get('bugID');
    });

    this.bugService.getBugById(this.bugId).subscribe(bug => {
      this.bug = bug;
      console.log(bug);
      this.returnedBug.id = bug.id;
      this.returnedBug.title = bug.title;
      this.returnedBug.description = bug.description;
      this.returnedBug.version = bug.version;
      this.returnedBug.targetDate = this.datePipe.transform(new Date(bug.targetDate), 'yyyy-MM-dd');
      this.returnedBug.status = bug.status;
      this.returnedBug.fixedVersion = bug.fixedVersion;
      this.returnedBug.severity = bug.severity;
      this.returnedBug.created_ID = bug.created_ID.username;
      this.returnedBug.assigned_ID = bug.assigned_ID.username;
      console.log(this.returnedBug);
    });

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
  }

}
