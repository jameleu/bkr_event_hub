import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-modal',
  template: `
  <div class="center">
    <button class="close-button" mat-icon-button (click)="onClose()"> <mat-icon aria-hidden="false" aria-label="Close dialog" fontIcon="close"></mat-icon>
    </button>
    <h1 class="err">Error</h1>
    <p class="msg">{{ data.message }}</p>
    <p class="msg"> If this issue persists, please contact <a href="mailTo:greatuofmbakingclub@gmail.com"> greatuofmbakingclub&#64;gmail.com</a>. </p>
    <div class="space"> 
    </div>
    </div>
  `,
  styleUrls: ['./err_modal.component.css']
})
export class ErrorModalComponent {
  constructor( public dialogRef: MatDialogRef<ErrorModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { message: string, err_type: string}, private router: Router) {}

  onClose(): void {
    if (this.data['err_type'] === "auth") {
        this.router.navigate(['/auth/'])
    }
    else if (this.data['err_type'] === "waitlist") {
        this.router.navigate(['/']);
    }
    this.dialogRef.close();
  }
}
