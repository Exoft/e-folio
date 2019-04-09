import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var UserLoggingService = /** @class */ (function () {
    function UserLoggingService(httpClient) {
        this.httpClient = httpClient;
    }
    UserLoggingService.prototype.signIn = function (loginData) {
        return this.httpClient.post('http://localhost:5000/api/account/login/', loginData);
    };
    UserLoggingService.prototype.signUp = function (registerData) {
        return this.httpClient.post('http://localhost:5000/api/account/register/', registerData);
    };
    UserLoggingService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UserLoggingService);
    return UserLoggingService;
}());
export { UserLoggingService };
//# sourceMappingURL=user-logging.service.js.map