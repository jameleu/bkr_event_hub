// event.service.ts
import { Injectable } from '@angular/core';
import { EventStore } from './event.store';
import { Event } from './event.model'; // Import the centralized Event model
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'TODO';

  constructor(private eventStore: EventStore, private http: HttpClient) {}

  getEvents() {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      tap((events) => {
        this.eventStore.upsertMany(events);
      })
    );
  }
  createEvent(newEvent: Event) {
    // Make a POST request to the API endpoint to create a new event
    return this.http.post<Event>(this.apiUrl, newEvent).pipe(
      tap(() => {
        // After successful creation, fetch updated events
        this.getEvents().subscribe();
      })
    );
  }
}
