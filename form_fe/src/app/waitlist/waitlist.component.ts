// event-waitlist.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event/event.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-waitlist',
  templateUrl: './event-waitlist.component.html',
  styleUrls: ['./event-waitlist.component.css'],
})
export class EventWaitlistComponent implements OnInit, OnDestroy {
  waitlist: string[] = [];
  private updateSubscription: Subscription | undefined;
  private eventId: string = "";

  constructor(private eventService: EventService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // Get the event ID from the route parameters
    this.route.paramMap.subscribe((params : any) => {
      this.eventId = params.get('eventId');
      // Set up WebSocket connection
      const ws = new WebSocket('ws://TODO');

      // Handle WebSocket updates
      ws.addEventListener('message', (event) => {
        const newData = JSON.parse(event.data);
        this.updateWaitlist(newData);
      });

      // Periodic HTTP polling every 30 seconds
      this.updateSubscription = interval(30000).subscribe(() => {
        this.refreshWaitlist();
      });
    });
  }

  ngOnDestroy(): void {
    // Clean up resources
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  refreshWaitlist() {
    // Make an HTTP request to fetch the waitlist
    this.eventService.getWaitlist(this.eventId).subscribe(
      (waitlist: string[]) => {
        this.updateWaitlist(waitlist);
      },
      (error: any) => {
        console.error('Error fetching waitlist:', error);
        // Handle error, e.g., show an error message
      }
    );
  }

  cancelReservation(name: string) {
    // Make an HTTP request to cancel the reservation
    this.eventService.cancelReservation(this.eventId, name).subscribe(
      (response: any) => {
        console.log('Reservation canceled:', response);
        // Optionally, update the waitlist after successful cancellation
        this.refreshWaitlist();
      },
      (error: any) => {
        console.error('Cancellation failed:', error);
      }
    );
  }

  private updateWaitlist(newData: string[]) {
    // Update the waitlist with new data
    this.waitlist = newData;
  }
}
