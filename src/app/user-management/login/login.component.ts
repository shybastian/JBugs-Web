import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import sha256 from 'fast-sha256';
import {BackendService} from '../../core/backend/services/backend.service';
import {CaptchaService} from '../services/captcha.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // private captchaService = new CaptchaService();
  private hashedPassword: string;

  constructor(public router: Router, private backendservice: BackendService, private captchaService: CaptchaService) {
  }

  ngOnInit() { // wont update captcha text, because it's run after init inputs
  }

  log(value) {
    console.log('NgModel', value);
  }

  submit(loginForm: NgForm) {
    console.log('NgForm', loginForm);
    this.captchaService.atSubmit(loginForm);
    // backendservice.get(username, password)..returns UserDTO
    // redirect to Dashboard
    // writes in session data about user... like if admin or not
  }

  login(loginForm: NgForm) {
    this.getHashedPassword(loginForm.form.value.password);

    // this.backendservice.post('', '');
    // console.log(loginForm);
    // this.router.navigate(['/dashboard']);
  }

  getHashedPassword(password: string): string {
    const enc = new TextEncoder(); // always utf-8
    const utf8arrayFromPassw = (enc.encode(password));
    const utf8arrayHashedPassw = sha256(utf8arrayFromPassw);
    const dec = new TextDecoder('utf-8');
    this.hashedPassword = dec.decode(utf8arrayHashedPassw);

    return this.hashedPassword;
  }

  // Generate new rand CAPTCHA code
  generateCaptchaUpdateForm(loginForm: NgForm) {
    this.captchaService.generateCaptchaUpdateForm(loginForm);
  }

}
