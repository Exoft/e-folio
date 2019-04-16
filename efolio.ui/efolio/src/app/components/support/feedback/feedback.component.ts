import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { EmailService } from 'src/app/services/email.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent {
  public feedbackForm: FormGroup;
  constructor(public loginValidatorBar: MatSnackBar,
    private emailService: EmailService, 
    private loaderService: LoaderService) {
    
    this.feedbackForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null, [Validators.email, Validators.required]),
      message: new FormControl(null, [Validators.required])
      
    });
  }
  SendEmail() {
    this.loaderService.startLoading();
          
        this.emailService.sendEmail(this.feedbackForm.value)
          .subscribe(
            result => {                     
  
              this.loginValidatorBar.open('Email sent!', 'Ok', {
                duration: 5000,
                panelClass: ['snackBar'],
              });
              this.loaderService.stopLoading();
            },
            error => {
              this.loginValidatorBar.open('Error sending email.', 'Ok', {
                duration: 5000,
                panelClass: ['snackBar'],
              });
              this.loaderService.stopLoading();
            }
          );
      
  }
  
}
