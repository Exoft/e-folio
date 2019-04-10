
import {Component, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';


@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent {
  public searchString = '';
  public check: boolean[] = [false, false, false, false];
  public filterStrings: string[] = [' .Net', ' Java', ' Angular', ' Node'];
  @Output() public SearchStringChanged = new EventEmitter<string>();
  constructor() { }
  public onSearchClick() {
    console.log(this.searchString);
    this.SearchStringChanged.emit(this.searchString);
  }
  public checkChange(i: number): void {
    this.check[i] = !this.check[i];
    if (this.check[i] === true) {
      this.searchString += this.filterStrings[i];
    } else {
      this.searchString = this.searchString.replace(this.filterStrings[i], '');
    }
  }
}

