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
        description: 'Description for Event 1\yap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yapyap yap yap',
        start_time: new Date(2024, 12, 24, 8, 0),
        end_time: new Date(2024, 12, 24, 12, 30),
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
        start_time: new Date(2025, 4, 24, 12, 30),
        end_time: new Date(2025, 4, 24, 1, 0),
        cap: 12,
        cat: 1,
        location: 'Location 2',
        leader: "Bob",
        imageUrl: "assets/images/default_img_4.png"  // in django, will randomly assign default img if not given
      },]
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
