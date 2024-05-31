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
  @Input() event: Event = { id: 0, name: '', description: '', start_time: new Date(), cat : 0, cap: 12, location: '', end_time: new Date(), leader: '', imageUrl: ''};
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
    this.formattedDate = format(this.event.start_time, 'MM/dd/yy')
    const startMinutes = getMinutes(this.event.start_time); 
    const endTime = this.event.end_time;
    const minutes = getMinutes(endTime); // end time minutes 
    const startTimePeriod = format(this.event.start_time, 'a');
    const endTimePeriod = format(this.event.end_time, 'a')
    if(startTimePeriod === endTimePeriod) {
      // exclude 00 if it is 00; put AM or PM if the start/end AM or PM are different
      this.formattedStartTime = startMinutes !== 0 ? format(this.event.start_time, 'h:mm') : format(this.event.start_time, 'h');
      this.formattedEndTime = minutes !== 0 ? format(endTime, 'h:mm a') : format(endTime, 'h a');
    }
    else {
      this.formattedStartTime = startMinutes !== 0 ? format(this.event.start_time, 'h:mm a') : format(this.event.start_time, 'h a');
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
