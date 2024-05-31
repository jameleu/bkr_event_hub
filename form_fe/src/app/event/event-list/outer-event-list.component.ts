// event-list.component.ts
import { Component } from '@angular/core';
import { UserEventsComponent } from '../user_event_list/user-event-list.component';
import { EventListComponent} from './event-list.component';
import { throwError } from 'rxjs';
@Component({
  selector: 'outer-event-list',
  template: `
  <button mat-button class="ev_but" (click)="toggleEvents()">My Events</button>
  <div *ngIf="my_events; else elseTemplate">
  <user-event-list/>
  </div>
  <ng-template #elseTemplate> 
  <app-event-list/>
  </ng-template>

    
  `,
  styleUrls: ['outer-event-list.component.css']

})
export class OuterEventList {
    my_events: boolean = false;
    constructor() {}
    toggleEvents() {
        this.my_events = !this.my_events;
      }
}
