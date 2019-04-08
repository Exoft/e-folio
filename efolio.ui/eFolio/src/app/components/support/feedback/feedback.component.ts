import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {LoaderService} from '../../../services/loader.service';
import {MatSnackBar} from '@angular/material';
import {UserLoggingService} from '../../../services/user-logging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
public feedbackform  = new FormGroup({
  name: new FormControl(null),
  email: new FormControl(null, [Validators.email, Validators.required]),
  message: new FormControl(null, [Validators.required])
});

 // constructor() { }
  constructor() { }

  ngOnInit() {}

}
