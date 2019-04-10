import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    public confirmPasswordValidator(formGroup: FormGroup) {
        if (!formGroup.get('password').value || !formGroup.get('confirmPassword').value
            || formGroup.get('password').value === null || formGroup.get('confirmPassword').value === null) {
            return null;
        }

        if (formGroup.get('password').value === formGroup.get('confirmPassword').value) {
            return null;
        } else {
            return { passwordsDoNotMatch: true };
        }
    }
}
