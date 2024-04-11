import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
})
export class CustomDialogComponent {
  title: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title || 'Title';
    this.description = data.description || 'Description';
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Pass true when "Yes" button is clicked
  }

  onNoClick(): void {
    this.dialogRef.close(false); // Pass false when "No" button is clicked
  }
}
