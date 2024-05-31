// event.service.ts
import { Injectable } from '@angular/core';
import { EventStore } from './event.store';
import { Event } from './event.model'; // Import the centralized Event model
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8000/v1/ev/event';

  constructor(private eventStore: EventStore, private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/`);
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  updateEvent(eventId: number, event: any): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${eventId}`, event);
  }

  createEvent(event: any): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/`, event);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }
  signup(formData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/signup`, formData, { headers });
  }
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>('http://localhost:8000/files/', formData);
  }
}