import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [
    {id: 1, name: 'Sebi'},
    {id: 2, name: 'Stefi'},
    {id: 3, name: 'Sonya'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
