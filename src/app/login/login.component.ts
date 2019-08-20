import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import sha256 from 'fast-sha256';
import {BackendService} from '../core/backend/services/backend.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private utf8arrayFromPassw;
  private utf8arrayHashedPassw;
  private hashedPassword: string;

  constructor(public router: Router, private backendservice: BackendService) {
  }

  ngOnInit() {
  }

  log(value) {
    console.log('NgModel', value);
  }

  submit(form: NgForm) {
    console.log('NgForm', form);

    // backendservice.get(username, password)..returns UserDTO
    // redirect to Dashboard
    // writes in session data about user... like if admin or not
  }

  login(loginForm: NgForm) {
    const enc = new TextEncoder(); // always utf-8
    this.utf8arrayFromPassw = (enc.encode(loginForm.form.value.password));
    this.utf8arrayHashedPassw = sha256(this.utf8arrayFromPassw);

    const dec = new TextDecoder('utf-8');
    this.hashedPassword = dec.decode(this.utf8arrayHashedPassw);

    this.backendservice.post('', '');
    // console.log(loginForm);
    // this.router.navigate(['/dashboard']);
  }
}
