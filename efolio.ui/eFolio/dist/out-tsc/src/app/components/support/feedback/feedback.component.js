import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
var FeedbackComponent = /** @class */ (function () {
    function FeedbackComponent() {
        this.feedbackForm = new FormGroup({
            name: new FormControl(null),
            email: new FormControl(null, [Validators.email, Validators.required]),
            message: new FormControl(null, [Validators.required])
        });
    }
    FeedbackComponent = tslib_1.__decorate([
        Component({
            selector: 'app-feedback',
            templateUrl: './feedback.component.html',
            styleUrls: ['./feedback.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FeedbackComponent);
    return FeedbackComponent;
}());
export { FeedbackComponent };
//# sourceMappingURL=feedback.component.js.map