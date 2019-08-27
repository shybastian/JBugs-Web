import {AbstractControl, ValidationErrors} from '@angular/forms';

export class BugCreateValidator {

  /**
   * This function creates a validator over an input field type text,
   * so that it contains only 3 or less groups of 2 alphanumerical characters.
   * Ex: 1.1.1 | 1.1 etc.
   * @param control contains the Control object, from which we take the value
   * to test the Regex expression with.
   */
  static validateVersion(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const regexExpression = new RegExp('(([\\w][.]){1,2}[\\w])');
    if (value && !regexExpression.test(value)) {
      return {validateVersion: true};
    }
  }
}
