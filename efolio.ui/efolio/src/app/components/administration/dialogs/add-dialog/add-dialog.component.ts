import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

export interface DialogData {
  name: string;
  internalDescription: string;
  externalDescription: string;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public addForm = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    inDescFormControl: new FormControl('', Validators.required),
    exDescFormControl: new FormControl('', Validators.required)
  });

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
