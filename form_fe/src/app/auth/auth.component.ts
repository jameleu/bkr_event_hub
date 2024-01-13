// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  getControl(controlName: string) {
    return this.loginForm.get(controlName)
  }
  onSubmit() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response: any) => {
        // TODO
        console.log(response);
      },
      (error: any) => {
        // TODO
        console.error(error);
      }
    );
  }
}