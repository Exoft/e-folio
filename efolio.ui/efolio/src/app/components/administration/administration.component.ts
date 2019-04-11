import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { AdministrationService } from 'src/app/services/administration.service';
import { User } from 'src/app/models/user.model';

@Component({
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  opened = true;
  public showUsersTable = false;
  public showProjectsTable = false;
  public showDevelopersTable = false;
  public users: User[] = [];

  constructor(
    private loaderService: LoaderService,
    private administrationService: AdministrationService) { }

  ngOnInit() {
    this.loaderService.stopLoading();
  }

  showAllUsers() {
    this.showUsersTable = true;
    this.showProjectsTable = false;
    this.showDevelopersTable = false;
  }

  showAllProjects() {
    this.showUsersTable = false;
    this.showProjectsTable = true;
    this.showDevelopersTable = false;
  }

  showAllDevelopers() {
    this.showUsersTable = false;
    this.showProjectsTable = false;
    this.showDevelopersTable = true;
  }
}
