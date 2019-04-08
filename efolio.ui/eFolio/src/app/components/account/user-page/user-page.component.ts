import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserLoggingService } from 'src/app/services/user-logging.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  public personalInfoForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  public emailForm = new FormGroup({
    email: new FormControl('')
  })

  public passwordVisibility = true;
  public confirmPasswordVisibility = true;
  public user: User;

  constructor(private loaderService: LoaderService,
              private userLoggingService: UserLoggingService) { }

  ngOnInit() {
    this.loaderService.stopLoading();

    this.userLoggingService.getUserInfo(localStorage.getItem('userId'))
      .subscribe(response => {
        this.getData(response);
        this.personalInfoForm.controls['firstName'].setValue(this.user.firstName);
        this.personalInfoForm.controls['lastName'].setValue(this.user.lastName);
        this.emailForm.controls['email'].setValue(this.user.email);
      },
        error => {
          return console.log(error);
        }
      );
  }

  getData(response) {
    this.user = new User(response.id,
      response.firstName,
      response.lastName,
      response.userName,
      response.email,
      response.emailConfirmed);
  }

  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  }
}
