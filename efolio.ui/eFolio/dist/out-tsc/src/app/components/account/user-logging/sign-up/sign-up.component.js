import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserLoggingService } from 'src/app/services/user-logging.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(userLoggingService, validationService) {
        this.userLoggingService = userLoggingService;
        this.validationService = validationService;
        this.hidePassword = true;
        this.hideConfirmPassword = true;
        this.registerForm = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required])
        });
    }
    SignUpComponent.prototype.onSignUp = function () {
        if (this.registerForm.valid) {
            var formData = {
                firstName: this.registerForm.value.firstName,
                lastName: this.registerForm.value.lastName,
                email: this.registerForm.value.email,
                password: this.registerForm.value.password
            };
            this.userLoggingService.signUp(formData)
                .subscribe();
        }
        this.registerForm.reset();
    };
    SignUpComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sign-up',
            templateUrl: './sign-up.component.html',
            styleUrls: ['./sign-up.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserLoggingService,
            ValidationService])
    ], SignUpComponent);
    return SignUpComponent;
}());
export { SignUpComponent };
//# sourceMappingURL=sign-up.component.js.map