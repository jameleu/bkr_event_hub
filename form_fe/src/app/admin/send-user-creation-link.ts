// create-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  template:  `
  <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <label for="username">Username:</label>
  <input type="text" id="username" formControlName="username" required>

  <label for="email">Email:</label>
  <input type="email" id="email" formControlName="email" required>

  <label for="password">Password:</label>
  <input type="password" id="password" formControlName="password" required>

  <button type="submit" [disabled]="userForm.invalid">Create User</button>
</form>

  `,
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.userForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;
    // this.userService.createUser(userData).subscribe(
    //   () => {
    //     console.log('User created successfully.');
    //     this.router.navigate(['/users']); // Redirect to user list page after successful creation
    //   },
    //   error => {
    //     console.error('Error creating user:', error);
    //     // Handle error (e.g., display error message)
    //   }
    // );
  }
}
