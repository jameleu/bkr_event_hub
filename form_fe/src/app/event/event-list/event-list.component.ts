// event-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { EventComponent } from '../event.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  template: `
    <p> HI </p>
    <div *ngFor="let event of events">
      <app-event [event]="event"></app-event>
    </div>
  `,
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
      { id: 1, name: 'Event 1', description: 'Description for Event 1' },
      { id: 2, name: 'Event 2', description: 'Description for Event 2' },
    ]
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
