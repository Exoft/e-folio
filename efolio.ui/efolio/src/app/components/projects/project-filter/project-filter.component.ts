import {Component, Input, Output} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent {
  public searchString;
  @Output() public SearchStringChanged = new EventEmitter<string>();

  constructor() {}
  public onSearchClick() {
    console.log(this.searchString);
    this.SearchStringChanged.emit(this.searchString);
  }
}
