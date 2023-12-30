import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-creation',
  template: `
    <!-- Event creation form -->
    <form (submit)="createEvent()">
      <label for="eventName">Event Name:</label>
      <input type="text" id="eventName" [(ngModel)]="eventName" required>

      <label for="eventDescription">Event Description:</label>
      <textarea id="eventDescription" [(ngModel)]="eventDescription" required></textarea>

      <button type="submit">Create Event</button>
    </form>
  `,
})
export class EventCreationComponent {
  eventName: string = '';
  eventDescription: string = '';

  constructor(private eventService: EventService) {}

  createEvent() {
    // Check if both name and description are provided
    if (this.eventName.trim() && this.eventDescription.trim()) {
      // Logic to create a new event object
      const newEvent: Event = {
        id: 0, // Assuming the server generates the ID
        name: this.eventName.trim(),
        description: this.eventDescription.trim(),
      };

      // Call the EventService to create the event
      this.eventService.createEvent(newEvent).subscribe(() => {
        // Reset the form or clear input fields after successful creation
        this.eventName = '';
        this.eventDescription = '';
      });
    } else {
      // Handle the case where either name or description is not provided
      console.error('Both event name and description are required.');
    }
  }
}
