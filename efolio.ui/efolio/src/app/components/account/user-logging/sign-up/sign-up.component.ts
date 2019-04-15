import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public passwordVisibility = true;
  public confirmPasswordVisibility = true;
  public passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

  public registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.passwordRegex)])),
    confirmPassword: new FormControl('', Validators.required)
  }, {
      validators: this.validationService.confirmPasswordValidator
    });

  constructor(private authService: AuthService,
              public validationService: ValidationService,
              public loginValidatorBar: MatSnackBar,
              private loaderService: LoaderService) {
  }

  onSignUp(): void {
    this.loaderService.startLoading();
    if (this.registerForm.valid) {
      const formData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      this.authService.signUp(formData)
        .subscribe(
          response => {
            if (response) {
              this.loginValidatorBar.open('You are registered in eFolio', 'OK', {
                duration: 5000,
                panelClass: ['snackBar'],
              });
              this.loaderService.stopLoading();
            }
          },
          error => {
            this.loginValidatorBar.open('Something went wrong! You are not registered in eFolio', 'OK', {
              duration: 5000,
              panelClass: ['snackBar'],
            });
            this.loaderService.stopLoading();
          }
        );
    }
    this.registerForm.reset();
/*
    let control: AbstractControl = null;
    Object.keys(this.registerForm.controls).forEach((name) => {
      control = this.registerForm.controls[name];
      control.setErrors(null);
    });*/

    // this.registerForm.markAsUntouched();
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
  }
}
