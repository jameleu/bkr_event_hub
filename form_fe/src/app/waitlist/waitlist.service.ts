// waitlist.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  private apiUrl = 'http://TODO'

  constructor(private http: HttpClient) {}

  getWaitlist(eventId: string): Observable<string[]> {
    const url = `${this.apiUrl}/events/${eventId}/waitlist/`;
    return this.http.get<string[]>(url);
  }

  cancelReservation(eventId: string, name: string): Observable<any> {
    const url = `${this.apiUrl}/events/${eventId}/cancel-reservation/`;
    const body = { name };
    return this.http.post(url, body);
  }
}
