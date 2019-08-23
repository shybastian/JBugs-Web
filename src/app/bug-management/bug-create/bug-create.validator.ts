import {AbstractControl, ValidationErrors} from '@angular/forms';

export class BugCreateValidator {

  static validateVersion(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const regexExpression = new RegExp('[a-zA-Z0-9.]{1,3}');
    if (value && !regexExpression.test(value)) {
      return {validateVersion: true};
    }
  }
}
