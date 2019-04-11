// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialsModule } from './app-materials.module';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { Interceptor } from './helpers/interceptor';

// Components
import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SupportComponent } from './components/support/support.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AccountComponent } from './components/account/account.component';
import { ProjectFilterComponent } from './components/projects/project-filter/project-filter.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectItemComponent } from './components/projects/project-list/project-item/project-item.component';
import { UserLoggingComponent } from './components/account/user-logging/user-logging.component';
import { SignUpComponent } from './components/account/user-logging/sign-up/sign-up.component';
import { SignInComponent } from './components/account/user-logging/sign-in/sign-in.component';
import { DevelopersComponent } from './components/developers/developers.component';
import { DevelopersListComponent } from './components/developers/developers-list/developers-list.component';
import { DevelopersItemComponent } from './components/developers/developers-list/developers-item/developers-item.component';
import { DeveloperServiceService } from './services/developer-service.service';
import { DevelopersFilterComponent } from './components/developers/developers-filter/developers-filter.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FeedbackComponent } from './components/support/feedback/feedback.component';
import { ContactInfoComponent } from './components/support/contact-info/contact-info.component';
import { ProjectPageComponent } from './components/projects/project-page/project-page.component';
import { AdminProjectListComponent } from './components/administration/admin-project-list/admin-project-list.component';
import { UserPageComponent } from './components/account/user-page/user-page.component';
import { EditDialogComponent } from './components/administration/dialogs/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './components/administration/dialogs/add-dialog/add-dialog.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdministrationGuard } from './guards/administration.guard';

//Pipe
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    ContactInfoComponent,
    FeedbackComponent,
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
    UserLoggingComponent,
    SignUpComponent,
    SignInComponent,
    FeedbackComponent,
    ContactInfoComponent,
    DevelopersListComponent,
    DevelopersItemComponent,
    SpinnerComponent,
    DevelopersFilterComponent,
    ProjectPageComponent,
    AdminProjectListComponent,
    UserPageComponent,
    EditDialogComponent,
    AddDialogComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialsModule,
    LayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    DeveloperServiceService,
    AuthGuard,
    AdministrationGuard
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    EditDialogComponent,
    AddDialogComponent
  ]
})
export class AppModule { }
