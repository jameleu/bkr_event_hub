import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://your-django-backend/api';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login/`, credentials);
  }

  logout() {
    // todo
}