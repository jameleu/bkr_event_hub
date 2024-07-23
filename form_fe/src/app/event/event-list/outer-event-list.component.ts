// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserEventsComponent } from '../user_event_list/user-event-list.component';
import { EventListComponent} from './event-list.component';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'outer-event-list',
  template: `
  <div>
    <div *ngIf="logged_in; else elseBlock">
        <div *ngIf="!my_events; else elseTemplate">
        <button mat-button class="ev_but" (click)="toggleEvents()">My Events</button>
        <button mat-button class="log_but" (click)="logout()">Logout</button>
        <user-event-list/>
        </div>
        <ng-template #elseTemplate> 
        <button mat-button class="ev_but" (click)="toggleEvents()">All Events</button>
        <button mat-button class="log_but" (click)="logout()">Logout</button>
        <app-event-list/>
        </ng-template>

    </div>
    <ng-template #elseBlock>
        <button mat-button (click)="login()">Login</button>
        <app-event-list/>
    </ng-template>
  </div>
  `,
  styleUrls: ['outer-event-list.component.css']

})
export class OuterEventList implements OnInit {
    my_events: boolean = false;
    logged_in: boolean = false;
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe((loggedIn: boolean) => {
            this.logged_in = loggedIn;
          });
    }        
    toggleEvents() {
        this.my_events = !this.my_events;
      }
    login(): void {
      this.router.navigate(['/auth']);
    }
    logout(): void {
      this.authService.logout();
    }
}
