import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../event/event.service';
import { AuthService } from '../auth/auth.service';
import { Event } from '../event/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.css']
})
export class AdminEventListComponent implements OnInit {
  events: Event[] = [];
  is_superuser = false;
  //TODO: add delete user function
  constructor(private eventService: EventService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getEvents();
    this.checkSuperuser();
  }
  checkSuperuser(): void {
    this.authService.isSuperuser().subscribe(response => {
      this.is_superuser = response.is_superuser;
    });
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }

  editEvent(eventId: number): void {
    // Implement navigation to the edit event page or open a modal
    // For example, you might use Angular Router to navigate to an edit page:
    // this.router.navigate(['/edit-event', eventId]);
    console.log(`Editing event with ID: ${eventId}`);
  }

  deleteEvent(eventId: number): void {
    console.log(eventId)
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(() => {
        this.events = this.events.filter(event => event.id !== eventId);
      });
    }
  }
  goToAdminPage(): void {
    this.router.navigate(['/admin/create']);
  }
}
