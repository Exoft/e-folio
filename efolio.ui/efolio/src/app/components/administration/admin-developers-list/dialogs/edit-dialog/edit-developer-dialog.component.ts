import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdministrationService } from 'src/app/services/administration.service';
import { Developer } from 'src/app/models/developer.model';

@Component({
  selector: 'app-edit-developer-dialog',
  templateUrl: './edit-developer-dialog.component.html',
  styleUrls: ['./edit-developer-dialog.component.scss']
})
export class EditDeveloperDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDeveloperDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Developer) { }


  closeEdit(): void {
    this.dialogRef.close();
  }
}
