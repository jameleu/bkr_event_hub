import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  template: `
    <p-table [value]="events">
      <ng-template pTemplate="header">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-event>
        <tr>
          <td>{{ event.name }}</td>
          <td>{{ event.description }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.subscription = this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}