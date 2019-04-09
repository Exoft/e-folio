import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Developer } from 'src/app/components/models/developer.model';
import { AdministrationService } from 'src/app/services/administration.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  constructor(public dialogRed: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Developer,
    public administrationService: AdministrationService) { }

    formControl = new FormControl('', [
      Validators.required
    ]);

    public confirmAdd(): void{
      this.administrationService.addDeveloper(this.data);
    }
    public onNoClick(){
      this.dialogRed.close();
    }
}
