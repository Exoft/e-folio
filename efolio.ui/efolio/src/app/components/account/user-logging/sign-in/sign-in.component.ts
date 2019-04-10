import { Component } from '@angular/core';
import { UserLoggingService } from 'src/app/services/user-logging.service';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from 'src/app/services/loader.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public passwordVisibility = true;
  public token: string;
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', [Validators.required])
  });

  constructor(public loginValidatorBar: MatSnackBar,
    private userLoggingService: UserLoggingService,
    private loaderService: LoaderService) {
  }

  onSignIn(): void {
    this.loaderService.startLoading();
    if (this.loginForm.valid) {
      const formData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      const tokenKey = 'accessToken';
      const idKey = 'id';
      this.userLoggingService.signIn(formData)
        .subscribe(
          response => {
            const token = response[tokenKey];
            const decodedToken = jwt_decode(token);
            localStorage.setItem('accessToken', token);
            localStorage.setItem('validUntil', decodedToken.exp);
            localStorage.setItem('userRole', decodedToken.role);
            localStorage.setItem('userId', response[idKey]);
            this.loginValidatorBar.open('You are logged in eFolio', 'Ok', {
              duration: 5000,
              panelClass: ['snackBar'],
            });
            this.loaderService.stopLoading();
          },
          error => {
            this.loginValidatorBar.open('Invalid Email or Password', 'Ok', {
              duration: 5000,
              panelClass: ['snackBar'],
            });
            this.loaderService.stopLoading();
          }
        );
    }
    this.loginForm.reset();
    this.loginForm.markAsUntouched();

    let control: AbstractControl = null;
    Object.keys(this.loginForm.controls).forEach((name) => {
      control = this.loginForm.controls[name];
      control.setErrors(null);
    });
  }
}
