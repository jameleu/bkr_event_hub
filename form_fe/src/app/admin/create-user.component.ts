// create-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.userForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
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
