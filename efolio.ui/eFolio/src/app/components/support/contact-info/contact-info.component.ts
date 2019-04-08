import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})

export class ContactInfoComponent implements OnInit {

  // constructor() { }
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.stopLoading();
  }
}
