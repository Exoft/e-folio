import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-developers-filter',
  templateUrl: './developers-filter.component.html',
  styleUrls: ['./developers-filter.component.scss']
})
export class DevelopersFilterComponent {
  public searchString;
  @Output() public SearchStringChanged = new EventEmitter<string>();

  constructor(public projectsercice: ProjectService) { }
  public onSearchClick() {
    console.log(this.searchString);
    this.SearchStringChanged.emit(this.searchString);
  }

}
