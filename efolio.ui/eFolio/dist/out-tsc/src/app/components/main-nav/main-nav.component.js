import * as tslib_1 from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
var MainNavComponent = /** @class */ (function () {
    function MainNavComponent() {
        this.showSidenav = true;
    }
    MainNavComponent.prototype.onResize = function () {
        if (window.innerWidth > 700) {
            this.drawer.close();
            this.showSidenav = false;
        }
    };
    tslib_1.__decorate([
        ViewChild('drawer'),
        tslib_1.__metadata("design:type", Object)
    ], MainNavComponent.prototype, "drawer", void 0);
    tslib_1.__decorate([
        HostListener('window:resize', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], MainNavComponent.prototype, "onResize", null);
    MainNavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-main-nav',
            templateUrl: './main-nav.component.html',
            styleUrls: ['./main-nav.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MainNavComponent);
    return MainNavComponent;
}());
export { MainNavComponent };
//# sourceMappingURL=main-nav.component.js.map