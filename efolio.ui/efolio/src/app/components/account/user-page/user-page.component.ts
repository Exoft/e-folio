import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';  
import { User } from 'src/app/models/user.model';

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
  });

  public passwordVisibility = true;
  public confirmPasswordVisibility = true;
  public user: User;

  constructor(private loaderService: LoaderService,
              private authService: AuthService,
              public loginValidatorBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.getUserInfo(localStorage.getItem('userId'))
      .subscribe(response => {
        this.getData(response);
        this.personalInfoForm.controls.firstName.setValue(this.user.firstName);
        this.personalInfoForm.controls.lastName.setValue(this.user.lastName);
        this.emailForm.controls.email.setValue(this.user.email);
      });
    this.loaderService.stopLoading();
  }

  getData(response): void {
    this.user = new User(response.id,
      response.firstName,
      response.lastName,
      response.userName,
      response.email,
      response.emailConfirmed);
  }

  logOut(): void {
    this.loaderService.startLoading();
    this.authService.deleteUserData();

    this.loginValidatorBar.open('You are logged out', 'OK', {
      duration: 5000,
      panelClass: ['snackBar'],
    });

    this.loaderService.stopLoading();
  }
}