// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private superuserUrl = '/api/is-superuser/';

  constructor(private http: HttpClient) {}

  isSuperuser(): Observable<{ is_superuser: boolean }> {
    return this.http.get<{ is_superuser: boolean }>(this.superuserUrl);
  }
}
