import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-user-logging',
  templateUrl: './user-logging.component.html',
  styleUrls: ['./user-logging.component.scss']
})

export class UserLoggingComponent implements OnInit {
  public showSignUpWindowForMobileDevices = true;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.stopLoading();
  }
}
