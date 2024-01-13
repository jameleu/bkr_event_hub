// event.component.ts
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Event } from './event.model';
import { EventDetailModalComponent } from './event-actions/event-detail-modal.component';
import { format, getMinutes, addMinutes } from 'date-fns';

@Component({
  selector: 'app-event',
  template: `
  <div class="event-container">
    <h3 class="event-name">{{ event.name }}</h3>
    <p class="date">{{ this.formattedDate }}</p>
    <p class="time">{{ this.formattedStartTime }} - {{ this.formattedEndTime }}</p>
    <button mat-button (click)="openModal()" class="view"> View Details </button>
  </div>
  `,
  styleUrls: ['./event.css']
})
export class EventComponent {
  @Input() event: Event = { id: 0, name: '', description: '', dateTime: new Date(), location: '', duration: 0};
  formattedStartTime: string;
  formattedDate: string;
  formattedEndTime: string;

  constructor(private dialog: MatDialog) {
    this.formattedStartTime = "";
    this.formattedDate = "";
    this.formattedEndTime = "";

  }

  ngOnInit() {
    this.formattedDate = format(this.event.dateTime, 'MM/dd/yy')
    const startMinutes = getMinutes(this.event.dateTime); 
    const endTime = addMinutes(this.event.dateTime, this.event.duration);
    const minutes = getMinutes(endTime); 
    const startTimePeriod = format(this.event.dateTime, 'a');
    const endTimePeriod = format(endTime, 'a');
    if(startTimePeriod === endTimePeriod) {
      this.formattedStartTime = startMinutes !== 0 ? format(this.event.dateTime, 'h:mm') : format(this.event.dateTime, 'h');
      this.formattedEndTime = minutes !== 0 ? format(endTime, 'h:mm a') : format(endTime, 'h a');
    }
    else {
      this.formattedStartTime = startMinutes !== 0 ? format(this.event.dateTime, 'h:mm a') : format(this.event.dateTime, 'h a');
      this.formattedEndTime = minutes !== 0 ? format(endTime, 'h:mm a') : format(endTime, 'h a');
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(EventDetailModalComponent, {
      width: '70%',
      data: { event: this.event },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    // });
  }
}
