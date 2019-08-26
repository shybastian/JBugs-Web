import {FormGroup, ValidationErrors} from '@angular/forms';

export class UserRolesValidators {
  static requireOneCheckboxToBeChecked(formGroup: FormGroup): ValidationErrors | null {
    let checked = 0;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < 1) {
      return {
        requireOneCheckboxToBeChecked: true,
      };
    }

    return null;
  }
}
