import { Component, HostListener, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {
  public opened = true;
  public projects: Project[] = [];
  public pages: number[] = [0];
  public filterMode: string;
  public projectListSize: number;
  public currentPage: number;
  public from: number;
  constructor(private projectService: ProjectService, private loaderService: LoaderService) { }

  ngOnInit() {
    if (window.innerWidth > 700) {
      this.filterMode = 'side';
    } else { this.filterMode = 'over'; }
    this.loaderService.startLoading();

    this.projectService.getProjectSize().subscribe(value => {
      this.projectListSize = value;
      });
    this.calculatePages();
    this.currentPage = 0;
    this.projectService.getAll().subscribe(
      (res) => {
        res.forEach(element => {
          this.projects.push(new Project(
            element.id,
            element.name,
            element.internalDescription,
            element.externalDescription,
            element.photoBase64));
        });
        this.loaderService.stopLoading();
      }
    );
  }

  public getSearchedProject(searchString: string, from: number, size: number): void {
    this.projectService.getProjectSearched(searchString, from, size).subscribe(
      (res) => {
        res.forEach(element => {
          this.projects.push(new Project(
            element.id,
            element.name,
            element.internalDescription,
            element.externalDescription,
            element.photoBase64));
        });
        this.loaderService.stopLoading();
      }
    );
  }

  public onSearch(request: string): void {
    this.projects = [];
    this.getSearchedProject(request, 0, 10);    // fix hardcode leter!!!!!
  }

  @HostListener('window:resize', ['$event']) onResize() {
    if (window.innerWidth < 700) {
      this.filterMode = 'over';
    } else {
      this.filterMode = 'side';
    }
  }

  public calculatePages() {
    const temp = Math.floor(this.projectListSize / 10) + 1;
    for (let i = 1; i < 2; i++) {
      this.pages.push(i);
    }
  }
  onCurrentPageChanged(number: number) {
    this.currentPage = number;
    this.projects = [];
    const from = number * 10;
    this.getSearchedProject(' ', from, 10);
  }
}
