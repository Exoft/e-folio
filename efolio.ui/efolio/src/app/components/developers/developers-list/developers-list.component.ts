import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DeveloperServiceService as DeveloperService } from 'src/app/services/developer-service.service';
import { MatProgressSpinnerModule } from '@angular/material';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { LoaderService } from 'src/app/services/loader.service';
import { Developer } from 'src/app/models/developer.model';

@Component({
  selector: 'app-developers-list',
  templateUrl: './developers-list.component.html',
  styleUrls: ['./developers-list.component.scss']
})

export class DevelopersListComponent implements OnInit {
  public opened = true;
  developers: Developer[] = [];

  constructor(private developerService: DeveloperService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.startLoading();
    this.developerService.getAllDevelopers()
      .subscribe(response => {
        this.getData(response);
        this.loaderService.stopLoading();
      },
        (error) => console.log(error)
      );
  }
  public getData(response) {
    response.forEach(element => {
      this.developers.push(new Developer(element.id,
        element.fullName,
        element.internalCV,
        element.externalCV,
        element.photoBase64));
    });
  }
}
