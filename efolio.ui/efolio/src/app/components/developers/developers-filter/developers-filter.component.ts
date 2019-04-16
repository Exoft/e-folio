import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-developers-filter',
  templateUrl: './developers-filter.component.html',
  styleUrls: ['./developers-filter.component.scss']
})
export class DevelopersFilterComponent {
  public searchString = '';
  public check: boolean[] = [false, false, false, false];
  public filterStrings: string[] = [' .Net', ' Java', ' Angular', ' Node'];
  @Output() public searchStringChanged = new EventEmitter<string>();
  constructor() { }
  public onSearchClick() {
    console.log(this.searchString);
    this.searchStringChanged.emit(this.searchString);
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
