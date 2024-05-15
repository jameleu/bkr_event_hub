import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  apiUrl = 'http://TODO';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string }) {
    return this.http.post(`${this.apiUrl}/auth/`, credentials);
  }

  logout() {
    // todo
  }
}