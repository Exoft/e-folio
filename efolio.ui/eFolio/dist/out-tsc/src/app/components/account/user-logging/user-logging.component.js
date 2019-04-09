import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
var UserLoggingComponent = /** @class */ (function () {
    function UserLoggingComponent(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.signUp = true;
    }
    UserLoggingComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-logging',
            templateUrl: './user-logging.component.html',
            styleUrls: ['./user-logging.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BreakpointObserver])
    ], UserLoggingComponent);
    return UserLoggingComponent;
}());
export { UserLoggingComponent };
//# sourceMappingURL=user-logging.component.js.map