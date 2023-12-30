import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service'; // Adjust the import path

@Component({
  selector: 'app-event-form-signup',
  templateUrl: './event-form-signup.component.html',
  styleUrls: ['./event-form-signup.component.css']
})
export class EventFormSignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.eventService.signup(formData).subscribe(
        (response: any) => {
          console.log('Signup successful:', response);
          // Handle success, e.g., show a success message or redirect
        },
        (error: any) => {
          console.error('Signup failed:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
  }
}
