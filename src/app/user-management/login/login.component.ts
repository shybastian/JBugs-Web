import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {CaptchaService} from './services/captcha.service';
import {CryptoService} from './services/crypto.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private hashedPassword: string;

  constructor(public router: Router, private loginService: LoginService,
              private captchaService: CaptchaService, private cryptoService: CryptoService) {
  }

  log(value) {
    console.log('NgModel', value);
  }

  submit(loginForm: NgForm) {
    console.log('NgForm', loginForm);

  }

  login(loginForm: NgForm) {
    const captchaIsGood = this.captchaService.isSuccessAtSubmit(loginForm);
    if (captchaIsGood) {
      const hashedPassword = this.cryptoService.getHashedPassword(loginForm.form.value.password);

      this.loginService.loginGetUserWithoutHashedPass(loginForm.form.value.username, loginForm.form.value.password)
        .subscribe(response => {
          console.log(response);
        });

      this.loginService.loginGetUser(loginForm.form.value.username, hashedPassword).subscribe(response => {
        console.log(response);
      });

      // this.backendservice.post('', '');
      // this.router.navigate(['/dashboard']);
      // writes in session data about user... like if admin or not
    }
  }

  // Generate new rand CAPTCHA code
  generateCaptchaUpdateForm(loginForm: NgForm) {
    this.captchaService.generateCaptchaUpdateForm(loginForm);
  }

  alertForgotPass() {
    alert('Contact ADMIN to recover your password.');
  }
}
