// event-detail-modal.component.ts
import { Component, Inject } from '@angular/core';
import { Event } from '../event.model'; // Adjust the import path based on your project structure
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { format, addMinutes } from 'date-fns';

@Component({
  selector: 'app-event-detail-modal',
  template: `
  <div class="event-details">
    <h1 class="event-title">{{ data.event.name }}</h1>
    <h2 class="event-info"> When: {{ this.formattedDate }}</h2>
    <h2 class="event-info"> {{ this.formattedStartTime }} - {{ formattedEndTime }}</h2>
    <h3 class="event-info"> &#64; {{ data.event.location }}</h3>
    <p class="event-description">{{ data.event.description }}</p>
  </div>
  <button class="waitlist-button" mat-raised-button (click)="goToWaitlist(data.event.id)">
        Join Waitlist
  </button>
  <button class="close-button" mat-icon-button (click)="onClose()">
    <mat-icon aria-hidden="false" aria-label="Close dialog" fontIcon="close"></mat-icon>
  </button>
  `,
  styleUrls: ['./event-detail-modal.css']
})
export class EventDetailModalComponent {
  formattedStartTime: string;
  formattedDate: string;
  formattedEndTime: string;
  constructor(
    public dialogRef: MatDialogRef<EventDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: Event }, private router: Router
  ) {
    this.formattedDate = format(data.event.dateTime, 'EEEE, MMMM do, yyyy')
    this.formattedStartTime = format(data.event.dateTime, 'hh:mm a');
    const endTime = addMinutes(data.event.dateTime, data.event.duration);
    this.formattedEndTime = format(endTime, 'hh:mm a');
  }
  goToWaitlist(eventId: number): void {
    this.dialogRef.close();
    this.router.navigate(['/event-waitlist', eventId]);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
