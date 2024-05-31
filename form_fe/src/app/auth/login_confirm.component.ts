import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-login',
    template: `
    <div>
    <div class="space_1"></div>

    <div *ngIf="created"> Created Account and </div>
    <p> Logged In! Redirecting... </p>
    <button mat-button class="go_back" routerLink="/">
        Go Look At Events
    </button>
    <div class="space_2"></div>
    </div>
    `,
    styleUrls: ['./login_confirm.component.css']
  })
  export class LoginConfirmComponent implements OnInit {
    created : boolean;
    userId: string | null;
    token: string | null;
    
    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
        this.created = false
        this.userId = null;
        this.token = null;
    }

    ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('userId');
        this.token = this.route.snapshot.paramMap.get('token');
        const action = this.route.snapshot.data['action'];
        if (action === 'verify') {
            this.verifyUser();
        } else if (action === 'login') {
            this.loginUser();
        }
    }
    private verifyUser(): void {
        this.http.post(`${environment.apiUrl}/verify-user`, { userId: this.userId, token: this.token }).subscribe(
            response => {
                setTimeout(() => {
                    this.router.navigate(["/"]);
                }, 500)
                console.log("User verified: ", response);
            },
            error => {
                if (error.status == 403) {
                    this.router.navigate(['/auth/err/verify'])
                }
                else {
                    this.router.navigate(['/err'])
                }
                console.log("Error verifying user: ", error);
            }
        )
    }
    private loginUser(): void {
        this.http.get(`${environment.apiUrl}/v1/users/one-time-login/${this.userId}/${this.token}/`, {}).subscribe(
            response => {
                setTimeout(() => {
                    this.router.navigate(["/"]);
                }, 500)
                console.log("Logged in: ", response);
            },
            error => {
                if (error.status == 403) {
                    this.router.navigate(['/auth/err'])
                }
                else {
                    this.router.navigate(['/err'])
                }
                console.log("Error logging in: ", error);
            }  
        )
    }
  }