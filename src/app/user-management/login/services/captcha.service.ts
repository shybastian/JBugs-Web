import {NgForm} from '@angular/forms';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  private firedOnce = false;
  private lastGeneratedCode = '';

  constructor(public translate: TranslateService) {
  }

  isSuccessAtSubmit(loginForm: NgForm): boolean {
    let why = '';
    if (loginForm.form.value.captchaInput === '') {
      why += this.translate.instant('LOGIN.CAPTCHA_EMPTY');
    }
    if (loginForm.form.value.captchaInput !== '') {
      if (this.validCaptcha(loginForm.form.value.captchaInput) === false) {
        why += this.translate.instant('LOGIN.CAPTCHA_WRONG');
      }
    }
    if (why !== '') {
      alert(why);

      this.firedOnce = false;
      this.generateCaptchaUpdateForm(loginForm);

      return false;
    }
    return true;
  }

  // Generate new rand CAPTCHA code
  generateCaptchaUpdateForm(loginForm: NgForm) {
    if (this.firedOnce) {
      return;
    } else {
      let a = Math.floor((Math.random() * 126) + 33) + ''; // between 33 ! and  126 ~ // UTF16 decimal
      let b = Math.floor((Math.random() * 126) + 33) + '';
      let c = Math.floor((Math.random() * 126) + 33) + '';
      let d = Math.floor((Math.random() * 126) + 33) + '';
      let e = Math.floor((Math.random() * 126) + 33) + '';

      while (+a > 126) {
        a = Math.floor((Math.random() * 126) + 33) + '';
      }
      while (+b > 126) {
        b = Math.floor((Math.random() * 126) + 33) + '';
      }
      while (+c > 126) {
        c = Math.floor((Math.random() * 126) + 33) + '';
      }
      while (+d > 126) {
        d = Math.floor((Math.random() * 126) + 33) + '';
      }
      while (+e > 126) {
        e = Math.floor((Math.random() * 126) + 33) + '';
      }

      // console.log(a, b, c, d, e);

      a = String.fromCharCode(+a);
      b = String.fromCharCode(+b);
      c = String.fromCharCode(+c);
      d = String.fromCharCode(+d);
      e = String.fromCharCode(+e);

      this.lastGeneratedCode = a + b + c + d + e;
      // this.lastGeneratedCode = a + '  ' + b + '  ' +  c + '  ' +  d + '  ' +  e;

      loginForm.form.value.txtCaptcha = this.lastGeneratedCode;
      document.getElementById('captchaDiv').innerHTML = this.lastGeneratedCode;

      this.firedOnce = true;
    }
  }

  // Validate input against the generated number
  validCaptcha(captchaInput) {
    // const str1 = this.removeSpaces(this.lastGeneratedCode);
    const str2 = this.removeSpaces(captchaInput);
    if (this.lastGeneratedCode === str2) {
      return true;
    } else {
      return false;
    }
  }

  // Remove the spaces from the entered and generated code
  removeSpaces(str: string) {
    return str.split(' ').join('');
  }
}
