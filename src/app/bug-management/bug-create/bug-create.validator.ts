import {AbstractControl, ValidationErrors} from '@angular/forms';

export class BugCreateValidator {

  static validateVersion(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const regexExpression = new RegExp('[0-9a-z-A-z.]{3}');
    if (value && !regexExpression.test(value)) {
      return {validateVersion: true};
    }
  }
}
