import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export interface DialogData {
  name: string;
  internalDescription: string;
  externalDescription: string;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  public editForm = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    inDescFormControl: new FormControl('', Validators.required),
    exDescFormControl: new FormControl('', Validators.required)
  })

}
