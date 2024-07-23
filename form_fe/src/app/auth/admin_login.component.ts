// admin_login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { onlyLetters } from '../validators/only-letters';

@Component({
  selector: 'app-login',
  template: `
    <button mat-button class="log_but" (click)="regular_login()">Regular Login</button>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit($event)" class="centered-form">    
    <div class="center-column">
      <h1 class="title"> UMich Email Verification Login </h1>
      <mat-form-field>
            <input matInput placeholder="Username" formControlName="username" required>
            <mat-error *ngIf="getControl('username')?.hasError('required')">
                Required value
            </mat-error>
        </mat-form-field>
        <mat-form-field>
            <input matInput placeholder="Password" formControlName="password" required>
            <mat-error *ngIf="getControl('password')?.hasError('required')">
                Required value
            </mat-error>
        
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Login</button>
    </div>
    </form>
    `,
  styleUrls: ['./admin_login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getControl(controlName: string) {
    return this.loginForm.get(controlName)
  }
  onSubmit(form: NgForm) {
    const formData = {
      user : this.loginForm.get('username')?.value,
      password : this.loginForm.get('password')?.value
    };
    if(!this.loginForm.valid) {
       return;
    }
    this.login(formData);
}
  resetForm() {
    this.loginForm.reset();
  }
  login(formData: any) {
    const params = new HttpParams().set('uniqname', formData.user);
    this.http.get("http://127.0.0.1:8000/v1/users/admin/", {params: params}).subscribe(
      (response) => {
        console.log("User login process started successfully: ", response);
      },
      (error) => {
        console.error("Error starting login process: ", error);
        //TODO: catch invalid credentials error
      }
    );
    this.router.navigate(['/login-confirm-sent/']);
  }
  regular_login(): void {
    this.router.navigate(['/auth/']);
  }
}