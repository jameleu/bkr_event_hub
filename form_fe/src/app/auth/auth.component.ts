// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { OtpComponent } from './otp.component';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      uniqname: ['', Validators.required],
    });
  }
  getControl(controlName: string) {
    return this.loginForm.get(controlName)
  }
  onSubmit() {
    const credentials = this.loginForm.value;  //TODO store this somehow in session or rest api
    this.openOtpModal();
    this.authService.login(credentials).subscribe(
      (response: any) => {
        // TODO
        this.openOtpModal();
        console.log(response);
      },
      (error: any) => {
        // TODO
        console.error(error);
      }
    );
  }
  openOtpModal() {
    // Open the OTP modal
    const dialogRef = this.dialog.open(OtpComponent, {
      width: '400px', // Adjust the width as needed
      data: {} // You can pass data to your OTP modal if needed
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('OTP modal closed:', result);
    // });
  }
}