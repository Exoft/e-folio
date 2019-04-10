import {Component, HostListener, OnInit} from '@angular/core';
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
  public filterMode: string;
  constructor(private projectService: ProjectService, private loaderService: LoaderService) { }

  ngOnInit() {
    if (window.innerWidth > 700) {
      this.filterMode = 'side';
    } else { this.filterMode = 'over'; }
    this.loaderService.startLoading();
    this.projectService.GetAll().subscribe(
      (res) => {
        res.forEach(element => {
          this.projects.push(new Project(element.id, element.name, element.internalDescription, element.externalDescription, element.photoBase64));
        });
        this.loaderService.stopLoading();
      }
    );
  }
  public getSearchedProject(searchString: string) {
    this.projectService.getProjectSearched(searchString).subscribe(
      (res) => {
        res.forEach(element => {
          this.projects.push(new Project(element.id, element.name, element.internalDescription, element.externalDescription, element.photoBase64));
        });
        this.loaderService.stopLoading();
      }
    );
  }

  onSearch(request: string) {
    console.log(request);
    this.projects = [];
    this.getSearchedProject(request);
  }
  @HostListener('window:resize', ['$event']) onResize() {
    if (window.innerWidth < 700) {
      this.filterMode = 'over';
    } else {
      this.filterMode = 'side';
    }
  }
}
