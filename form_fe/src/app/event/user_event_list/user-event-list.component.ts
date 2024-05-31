// event-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { EventComponent } from '../event.component';
import { Subscription } from 'rxjs';
import { Time } from '@angular/common';

@Component({
  selector: 'user-event-list',
  template: `
    <div *ngFor="let event of events">
      <app-event [event]="event"></app-event>
    </div>
  `,
  styleUrls: ['user-event-list.component.css']
})
export class UserEventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => this.events = events);
  }

  ngOnInit(): void {
    // this.getEvents();
    this.events = [
      {
        id: 1,
        name: 'Event 1',
        description: 'Description for Event 1\yap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yap',
        start_time: new Date(2024, 12, 24, 8, 0),
        end_time: new Date(2024, 12, 24, 9, 30),
        cap: 8,
        cat: 2,
        location: 'Location 1',
        leader: "Bob",
        imageUrl: "assets/images/default_img_6.png"
      },
      {
        id: 2,
        name: 'Event 2',
        description: 'Description for Event 2',
        start_time: new Date(2025, 4, 24, 9, 30),
        end_time: new Date(2025, 4, 24, 10, 0),
        cap: 12,
        cat: 1,
        location: 'Location 2',
        leader: "Bob",
        imageUrl: "assets/images/default_img_4.png"  // in django, will randomly assign default img if not given
      },]
  }

}
