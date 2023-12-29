import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';

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
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }
}