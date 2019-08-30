import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {CaptchaService} from './services/captcha.service';
import {CryptoService} from './services/crypto.service';
import {LoginService} from '../services/login.service';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from './services/storage.service';
import {PermissionType} from "../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  public static SUCCESS_RESPONSE_MESSAGE = 'SUCCESS';

  // private hashedPassword: string;

  constructor(public router: Router, private loginService: LoginService,
              private captchaService: CaptchaService, private cryptoService: CryptoService,
              public storageService: StorageService, public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.captchaService.firedOnce = false;
  }

  login(loginForm: NgForm) {
    const captchaIsGood = this.captchaService.isSuccessAtSubmit(loginForm);
    if (captchaIsGood) {
      // this.hashedPassword = this.cryptoService.getHashedPassword(loginForm.form.value.password);

      this.loginService.loginGetUser(loginForm.form.value.username, loginForm.form.value.password)
        .subscribe(response => {
          // console.log('response', response);

          if (response.token === null || response.token === '' || response.messageCode != LoginComponent.SUCCESS_RESPONSE_MESSAGE) {
            alert(this.translate.instant('LOGIN.' + response.messageCode));
          } else {
            this.storageService.atLogin(response);

            // testing:
            console.log('session storage', sessionStorage);
            this.navigateAfterLogin();
          }
        });
    }
  }

  alertForgotPass() {
    alert(this.translate.instant('LOGIN.ALERT_FORGOT_PASS'));
  }

  private navigateAfterLogin() {
    if (this.storageService.userHasPermission(PermissionType.BUG_MANAGEMENT)) {
      this.router.navigate(['/dashboard/bugs/view']);
    } else {
      if (this.storageService.userHasPermission(PermissionType.USER_MANAGEMENT)) {
        this.router.navigate(['/dashboard/users/view']);
      } else {
        this.router.navigate(['/dashboard/notifications']);
      }
    }

  }
}
