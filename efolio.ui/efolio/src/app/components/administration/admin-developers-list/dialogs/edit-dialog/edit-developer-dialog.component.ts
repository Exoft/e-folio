import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Developer } from '../../../../../models/developer.model';
import { EditDeveloperData } from '../../../../../models/edit-developer-data.model';

@Component({
  selector: 'app-edit-developer-dialog',
  templateUrl: './edit-developer-dialog.component.html',
  styleUrls: ['./edit-developer-dialog.component.scss']
})
export class EditDeveloperDialogComponent {
  @ViewChild('file') fileInput: ElementRef;
  previewSrc: string | ArrayBuffer;

  constructor(public dialogRef: MatDialogRef<EditDeveloperDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditDeveloperData) { }

  fileSelected(event) {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file, file.name);
    this.data.imageData = formData;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  closeEdit(): void {
    this.dialogRef.close();
  }
}
