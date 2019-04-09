import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
var ProjectListComponent = /** @class */ (function () {
    function ProjectListComponent(projectService) {
        this.projectService = projectService;
        this.projects = [];
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectService.GetAll().subscribe(function (res) {
            res.forEach(function (element) {
                _this.projects.push(new Project(element.name, element.internalDescription));
            });
        });
    };
    ProjectListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-project-list',
            templateUrl: './project-list.component.html',
            styleUrls: ['./project-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ProjectService])
    ], ProjectListComponent);
    return ProjectListComponent;
}());
export { ProjectListComponent };
//# sourceMappingURL=project-list.component.js.map