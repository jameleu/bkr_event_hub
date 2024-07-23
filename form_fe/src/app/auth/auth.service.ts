import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private superuserUrl = '/api/is-superuser/';
  private loginUrl = '/api/login/';
  private logoutUrl = '/api/logout/';
  private base_url = 'http://127.0.0.1:8000/v1/users'
  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.base_url}/is_logged_in/`, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true }).pipe(
      map((response: any) => {
        console.log("login?: ", response);
        return response.is_logged_in as boolean;
      })
    );
  }

  isSuperuser(): Observable<{ is_superuser: boolean }> {
    return this.http.get<{ is_superuser: boolean }>(this.superuserUrl);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {});
  }
}
