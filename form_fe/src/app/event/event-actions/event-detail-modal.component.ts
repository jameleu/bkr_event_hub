// event-detail-modal.component.ts
import { Component, Inject } from '@angular/core';
import { Event } from '../event.model'; // Adjust the import path based on your project structure
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { format, addMinutes } from 'date-fns';

@Component({
  selector: 'app-event-detail-modal',
  template: `
    <div>
      <h1>{{ data.event.name }}</h1>
      <h2>Date: {{ this.formattedDate }} </h2>
      <h2>Time: {{ this.formattedStartTime }} - {{ formattedEndTime }}</h2>
      <h2>Location: {{ data.event.location }}</h2>
      <p>{{ data.event.description }}</p>
    </div>
    <button mat-icon-button (click)="onClose()">
      <mat-icon aria-hidden="false" aria-label="Close dialog" fontIcon="close"></mat-icon>
    </button>
    
  `,
})
export class EventDetailModalComponent {
  formattedStartTime: string;
  formattedDate: string;
  formattedEndTime: string;
  constructor(
    public dialogRef: MatDialogRef<EventDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: Event }
  ) {
    this.formattedDate = format(data.event.dateTime, 'EEEE, MMMM do, yyyy')
    this.formattedStartTime = format(data.event.dateTime, 'hh:mm a');
    const endTime = addMinutes(data.event.dateTime, data.event.duration);
    this.formattedEndTime = format(endTime, 'hh:mm a');
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
