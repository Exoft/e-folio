import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var ProjectService = /** @class */ (function () {
    function ProjectService(http) {
        this.http = http;
    }
    ProjectService.prototype.GetAll = function () {
        var httpHeaders = new HttpHeaders();
        this.addHeaders(httpHeaders);
        return this.http.get('http://localhost:5000/api/Project', {
            headers: httpHeaders
        });
    };
    ProjectService.prototype.addHeaders = function (headers) {
        headers.append('Authorization', 'kbasdlkgjbasalskfhalkdg');
        headers.append('Own-header', 'Ostap');
    };
    ProjectService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ProjectService);
    return ProjectService;
}());
export { ProjectService };
//# sourceMappingURL=project.service.js.map