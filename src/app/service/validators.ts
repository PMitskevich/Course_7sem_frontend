import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";

export function loginValidator(emailRegExp: RegExp, nameRegExp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value.toString().indexOf('@') !== -1 ?
      emailRegExp.test(control.value) ? null : {emailError: {value: control.value}}
      : nameRegExp.test(control.value) ? null : {nameError: {value: control.value}};
  };
}

export function phoneValidator(phoneRegExp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return phoneRegExp.test(control.value) ? null : {phoneError: {value: control.value}};
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

export function priceNotNegativeOrZero(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.negative) {
      return;
    }

    if (isNaN(Number(control.value.toString())) || control.value <= 0) {
      control.setErrors({negative: true});
    }
  }
}

