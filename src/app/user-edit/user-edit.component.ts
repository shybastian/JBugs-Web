import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(private activeedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeedRoute.paramMap.subscribe(result => {
      console.log("Result", result);
      result.get('userId');
    })
  }

}
