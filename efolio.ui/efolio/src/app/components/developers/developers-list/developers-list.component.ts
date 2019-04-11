import {Component, HostListener, OnInit} from '@angular/core';
import { DeveloperServiceService as DeveloperService } from 'src/app/services/developer-service.service';
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
  public filterMode: string;
  constructor(private developerService: DeveloperService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    if (window.innerWidth > 700) {
      this.filterMode = 'side';
    } else { this.filterMode = 'over'; }
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
  @HostListener('window:resize', ['$event']) onResize() {
    if (window.innerWidth < 700) {
      this.filterMode = 'over';
    } else {
      this.filterMode = 'side';
    }
  }

  public getSearchedDevelopers(searchString: string, from: number, size: number) {
    this.developerService.getDevelopersSearched(searchString, from, size).subscribe(
      response => {this.getData(response);
      },
    );
  }
  public onSearch(request: string): void {
    this.developers = [];
    this.getSearchedDevelopers(request, 0, 10);    // fix hardcode leter!!!!!
  }

}
