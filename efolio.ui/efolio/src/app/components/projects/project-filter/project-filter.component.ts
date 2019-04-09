import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent {
  public searchString;
  public check1 = false;
  public check2 = false;
  public check3 = false;
  public check4 = false;
  @Output() public SearchStringChanged = new EventEmitter<string>();
  constructor() { }
  public onSearchClick() {
    console.log(this.searchString);
    this.SearchStringChanged.emit(this.searchString);
  }

  check1change() {
    this.check1 = !this.check1;
    if (this.check1 === true) {
      this.searchString += ' .Net';
    } else {
      this.searchString = this.searchString.replace(' .Net', '');
    }
  }
  check2change() {
    this.check2 = !this.check2;
    if (this.check2 === true) {
      this.searchString += ' Java';
    } else {
      this.searchString = this.searchString.replace(' Java', '');
    }
  }
  check3change() {
    this.check3 = !this.check3;
    if (this.check3 === true) {
      this.searchString += ' Angular.';
    } else {
      this.searchString = this.searchString.replace(' Angular', '');
    }
  }
  check4change() {
    this.check4 = !this.check4;
    if (this.check4 === true) {
      this.searchString += ' Node';
    } else {
      this.searchString = this.searchString.replace(' Node', '');
    }
  }
}

