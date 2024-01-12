// event-detail-modal.component.ts
import { Component, Inject } from '@angular/core';
import { Event } from '../event.model'; // Adjust the import path based on your project structure
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-event-detail-modal',
  template: `
    <div>
      <h1>{{ event.name }}</h1>
      <h2>Date/Time: {{ event.dateTime }}</h2>
      <h2>Location: {{ event.location }}</h2>
      <p>{{ event.description }}</p>
    </div>
    <button mat-icon-button (click)="onClose()">
      <mat-icon aria-hidden="false" aria-label="Close dialog" fontIcon="close"></mat-icon>
    </button>
    
  `,
})
export class EventDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }
}
