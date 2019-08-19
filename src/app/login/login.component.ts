import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  log(value) {
    console.log('NgModel', value);
  }

  submit(form: NgForm) {
    console.log('NgForm', form);
    // utf8arrayFromString = nacl.util.decodeUTF8(string)
    // const hashPassword = sha256(['m', 'y', 'p', 'a', 's', 's', 'w', 'o', 'r', 'd']); // default export is hash

    // backendservice.get(username, password)..returns UserDTO
    // redirect to Dashboard
    // writes in session data about user... like if admin or not
  }

  login(loginForm: NgForm) {
    // console.log(loginForm);
    this.router.navigate(['/dashboard']);
  }
}
