import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {CaptchaService} from './services/captcha.service';
import {CryptoService} from './services/crypto.service';
import {LoginService} from '../services/login.service';
import {TranslateService} from '@ngx-translate/core';
import {PermissionType, RoleType, User, UserStatusType} from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private hashedPassword: string;

  constructor(public router: Router, private loginService: LoginService,
              private captchaService: CaptchaService, private cryptoService: CryptoService, public translate: TranslateService) {
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

      const temp_passw = loginForm.form.value.password;

      this.loginService.loginGetUser(loginForm.form.value.username, temp_passw)
        .subscribe(response => {
          console.log('response', response);
          // if response status !== 200, then redirect to localhost/4200 ?! or LABEL / (pop-up) invalid credentials
        })

      let user: User;
      user = {
        id: 1,
        firstName: 'adminFN',
        lastName: 'adminLN',
        username: 'admin',
        email: 'me@home',
        mobileNumber: '0040987656789',
        status: UserStatusType.Active,
        roles: [{
          id: 1,
          type: RoleType.ADM,
          permissions: [
            {
              id: 1,
              type: PermissionType.USER_MANAGEMENT,
              description: ''
            },
            {
              id: 2,
              type: PermissionType.BUG_MANAGEMENT,
              description: ''
            },
            {
              id: 3,
              type: PermissionType.BUG_CLOSE,
              description: ''
            },
            {
              id: 4,
              type: PermissionType.PERMISSION_MANAGEMENT,
              description: ''
            },
            {
              id: 5,
              type: PermissionType.BUG_EXPORT_PDF,
              description: ''
            },
            {
              id: 6,
              type: PermissionType.CURRENT_USER,
              description: ''
            },
          ]
        }]
      };

      /*
      this.loginService.loginGetUser(loginForm.form.value.username, hashedPassword).subscribe(response => {
        console.log(response);
      });
*/
      // this.backendservice.post('', '');
      // this.router.navigate(['/dashboard']);
      // writes in session data about user... like if admin or not
    }
  }

  alertForgotPass() {
    alert('Contact ADMIN to recover your password!');
  }
}
