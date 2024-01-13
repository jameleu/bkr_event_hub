// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response) => {
        // Handle successful login
        console.log(response);
      },
      (error) => {
        // Handle login error
        console.error(error);
      }
    );
  }
}