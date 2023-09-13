import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const isbnValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value: string = control.value;

  if (value.length == 10) {
    return value
      .split('')
      .map((ch, i) => (ch.toUpperCase() == 'X' ? 10 : parseInt(ch)) * (10 - i))
      .reduce((sum, n) => sum + n, 0) % 11
      ? { isbnInvalid: true }
      : null;
  }

  if (value.length == 13) {
    return value
      .split('')
      .map((ch, i) => parseInt(ch) * (i % 2 ? 1 : 3))
      .reduce((sum, n) => sum + n, 0) % 10
      ? { isbnInvalid: true }
      : null;
  }

  return { isbnLength: true };
};

export default isbnValidator;
