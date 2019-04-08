import { FormGroup } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})

export class ContactInfoComponent implements OnInit {

  public contactinfoForm: FormGroup;

  constructor(private loaderService: LoaderService) { 
    this.contactinfoForm = new FormGroup({});
  }

  ngOnInit() {
    this.loaderService.stopLoading();
  }
}
