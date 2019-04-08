import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../services/loader.service';

@Component({
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.stopLoading();
  }

}
