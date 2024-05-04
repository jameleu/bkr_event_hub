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
    <div class="dt">
      <p class="date">{{ this.formattedDate }}</p>
      <p class="time">{{ this.formattedStartTime }} - {{ this.formattedEndTime }}</p>
    </div>
    <button mat-button (click)="openModal()" class="view"> View Details </button>
    <img class="banner" [src]="event.imageUrl" alt="baking_banner">
  </div>
  `,
  styleUrls: ['./event.css']
})
export class EventComponent {
  @Input() event: Event = { id: 0, name: '', description: '', dateTime: new Date(), location: '', duration: 0, leader: '', imageUrl: ''};
  formattedStartTime: string;
  formattedDate: string;
  formattedEndTime: string;
  defaultImgUrl: string;

  constructor(private dialog: MatDialog) {
    this.formattedStartTime = "";
    this.formattedDate = "";
    this.formattedEndTime = "";
    this.defaultImgUrl = this.event.imageUrl;
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
      data: { event: this.event },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    // });
  }
}
