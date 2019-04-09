import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models/project.model';
var ProjectItemComponent = /** @class */ (function () {
    function ProjectItemComponent() {
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Project)
    ], ProjectItemComponent.prototype, "projectInput", void 0);
    ProjectItemComponent = tslib_1.__decorate([
        Component({
            selector: 'app-project-item',
            templateUrl: './project-item.component.html',
            styleUrls: ['./project-item.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ProjectItemComponent);
    return ProjectItemComponent;
}());
export { ProjectItemComponent };
//# sourceMappingURL=project-item.component.js.map