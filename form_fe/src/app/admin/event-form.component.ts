import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EventService } from '../event/event.service';
import { ReactiveFormsModule } from '@angular/forms';
import { startOfToday } from 'date-fns';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  eventForm: FormGroup;
  startDate: Date;
  

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: [null, Validators.required],
      duration: [1, Validators.required],
      location: ['', Validators.required],
      leader: ['', Validators.required],
    });
    this.startDate = startOfToday();
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value);
      this.eventForm.reset();
    }
  }
}