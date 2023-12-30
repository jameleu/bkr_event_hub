import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../event/event.service'; // Adjust the import path
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-waitlist',
  templateUrl: './event-waitlist.component.html',
  styleUrls: ['./event-waitlist.component.css']
})
export class EventWaitlistComponent implements OnInit, OnDestroy {
  waitlist: string[] = [];
  private updateSubscription: Timeout;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // Simulate periodic updates (replace with WebSocket or real-time solution)
    this.updateSubscription = setInterval(() => {
      this.refreshWaitlist();
    }, 5000); // Update every 5 seconds initially
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.updateSubscription) {
      clearInterval(this.updateSubscription);
    }
  }

  refreshWaitlist() {
    this.eventService.getWaitlist().subscribe(
      waitlist => {
        this.waitlist = waitlist;
      },
      error => {
        console.error('Error fetching waitlist:', error);
        // TODO: Handle error, e.g., show an error message
      }
    );
  }

  cancelReservation(name: string) {
    // Assuming you have an Akita store to manage state
    this.eventService.cancelReservation(name).subscribe(
      response => {
        console.log('Reservation canceled:', response);
        // Optionally, update the waitlist after successful cancellation
        this.refreshWaitlist();
      },
      error => {
        console.error('Cancellation failed:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
}
