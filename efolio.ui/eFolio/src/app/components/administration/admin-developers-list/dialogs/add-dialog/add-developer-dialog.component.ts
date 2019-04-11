import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdministrationService } from 'src/app/services/administration.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Developer } from 'src/app/models/developer.model';

@Component({
  selector: 'app-add-developer-dialog',
  templateUrl: './add-developer-dialog.component.html',
  styleUrls: ['./add-developer-dialog.component.scss']
})
export class AddDeveloperDialogComponent {

  constructor(public dialogRed: MatDialogRef<AddDeveloperDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Developer,
              public administrationService: AdministrationService) { }

  formControl = new FormGroup({
    'fullName': new FormControl(null),
    'internalCV': new FormControl(null),
    'externalCV': new FormControl(null)
  });

  public confirmAdd(): void {
    const form = this.formControl.value;
    this.data = new Developer(0, form.fullName, form.internalCV, form.externalCV, null);
    this.dialogRed.close(this.data);
    this.administrationService.addDeveloper(this.data)
      .subscribe(result => {
      });
  }

  public onNoClick() {
    this.dialogRed.close();
  }
}
