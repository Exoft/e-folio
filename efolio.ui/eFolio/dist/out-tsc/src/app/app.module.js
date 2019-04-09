import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatFormFieldModule, MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsComponent } from './components/projects/projects.component';
import { DevelopersComponent } from './components/developers/developers.component';
import { SupportComponent } from './components/support/support.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AccountComponent } from './components/account/account.component';
import { ProjectFilterComponent } from './components/projects/project-filter/project-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectItemComponent } from './components/projects/project-list/project-item/project-item.component';
import { ProjectService } from './services/project.service';
import { UserLoggingComponent } from './components/account/user-logging/user-logging.component';
import { UserLoggingService } from './services/user-logging.service';
import { SignUpComponent } from './components/account/user-logging/sign-up/sign-up.component';
import { SignInComponent } from './components/account/user-logging/sign-in/sign-in.component';
import { ValidationService } from './services/validation.service';
import { FeedbackComponent } from './components/support/feedback/feedback.component';
import { ContactInfoComponent } from './components/support/contact-info/contact-info.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                MainNavComponent,
                ProjectsComponent,
                DevelopersComponent,
                SupportComponent,
                AdministrationComponent,
                AccountComponent,
                ProjectFilterComponent,
                ProjectListComponent,
                ProjectItemComponent,
                ProjectFilterComponent,
                UserLoggingComponent,
                SignUpComponent,
                SignInComponent,
                SupportComponent,
                FeedbackComponent,
                ContactInfoComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                LayoutModule,
                MatToolbarModule,
                MatButtonModule,
                MatSidenavModule,
                MatIconModule,
                MatListModule,
                BrowserAnimationsModule,
                FormsModule,
                MatInputModule,
                MatFormFieldModule,
                HttpClientModule,
                ReactiveFormsModule,
                MatCardModule,
                MatGridListModule
            ],
            providers: [UserLoggingService, ValidationService, ProjectService],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map