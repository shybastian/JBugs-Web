import {NgForm} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  private firedOnce = false;
  private lastGeneratedCode = '';

  atSubmit(loginForm: NgForm) {
    let why = '';
    if (loginForm.form.value.captchaInput === '') {
      why += '- Please Enter CAPTCHA Code.\n';
    }
    if (loginForm.form.value.captchaInput !== '') {
      if (this.validCaptcha(loginForm.form.value.captchaInput) === false) {
        why += '- The CAPTCHA Code Does Not Match.\n';
      }
    }
    if (why !== '') {
      alert(why);

      this.firedOnce = false;
      this.generateCaptchaUpdateForm(loginForm);
    }
  }

  // Generate new rand CAPTCHA code
  generateCaptchaUpdateForm(loginForm: NgForm) {
    if (this.firedOnce) {
      return;
    } else {
      const a = Math.ceil(Math.random() * 9) + '';
      const b = Math.ceil(Math.random() * 9) + '';
      const c = Math.ceil(Math.random() * 9) + '';
      const d = Math.ceil(Math.random() * 9) + '';
      const e = Math.ceil(Math.random() * 9) + '';

      this.lastGeneratedCode = a + b + c + d + e;

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
