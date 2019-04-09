import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserLoggingService } from 'src/app/services/user-logging.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
var SignInComponent = /** @class */ (function () {
    function SignInComponent(userLoggingService) {
        this.userLoggingService = userLoggingService;
        this.hide = true;
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }
    SignInComponent.prototype.onSignIn = function () {
        if (this.loginForm.valid) {
            var formData = {
                email: this.loginForm.value.email,
                password: this.loginForm.value.password
            };
            var key_1 = 'accessToken';
            this.userLoggingService.signIn(formData)
                .subscribe(function (response) {
                localStorage.setItem('accessToken', response[key_1]);
            });
        }
        this.loginForm.reset();
    };
    SignInComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sign-in',
            templateUrl: './sign-in.component.html',
            styleUrls: ['./sign-in.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserLoggingService])
    ], SignInComponent);
    return SignInComponent;
}());
export { SignInComponent };
//# sourceMappingURL=sign-in.component.js.map