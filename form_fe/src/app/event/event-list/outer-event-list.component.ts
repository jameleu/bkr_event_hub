// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserEventsComponent } from '../user_event_list/user-event-list.component';
import { EventListComponent} from './event-list.component';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'outer-event-list',
  template: `
    <div *ngIf="logged_in; else elseBlock">
        <div *ngIf="!my_events; else elseTemplate">
        <button mat-button class="ev_but" (click)="toggleEvents()">My Events</button>
        <user-event-list/>
        </div>
        <ng-template #elseTemplate> 
        <button mat-button class="ev_but" (click)="toggleEvents()">All Events</button>
        <app-event-list/>
        </ng-template>
    </div>

    <ng-template #elseBlock>
        <app-event-list/>
    </ng-template>
    
  `,
  styleUrls: ['outer-event-list.component.css']

})
export class OuterEventList implements OnInit {
    my_events: boolean = false;
    logged_in: boolean = false;
    constructor(private authService: AuthService,) {}
    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe((loggedIn: boolean) => {
            this.logged_in = loggedIn;
          });
    }        
    toggleEvents() {
        this.my_events = !this.my_events;
      }
}
