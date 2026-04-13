import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-dialog.html',
  styleUrl: './review-dialog.css'
})
export class ReviewDialog {

  rating: number = 0;
  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submit() {
    if (this.rating < 1 || this.rating > 5 || !this.comment) return;

    this.dialogRef.close({
      rating: this.rating,
      comment: this.comment
    });
  }

  close() {
    this.dialogRef.close();
  }
}