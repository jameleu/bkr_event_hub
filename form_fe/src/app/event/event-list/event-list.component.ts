// event-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { EventComponent } from '../event.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  template: `
    <div *ngFor="let event of events">
      <app-event [event]="event"></app-event>
    </div>
  `,
  styleUrls: ['event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // this.subscription = this.eventService.getEvents().subscribe((events) => {
    //   this.events = events;
    // });
    this.events = [
      {
        id: 1,
        name: 'Event 1',
        description: 'Description for Event 1',
        dateTime: new Date('2023-01-01T12:00:00'), // Replace with an actual date and time
        duration: 120,
        location: 'Location 1',
        leader: "Bob"
      },
      {
        id: 2,
        name: 'Event 2',
        description: 'Description for Event 2',
        dateTime: new Date('2023-02-01T15:30:00'), // Replace with an actual date and time
        duration: 60,
        location: 'Location 2',
        leader: "Bob"
      },]
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
