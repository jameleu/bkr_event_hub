import { Component, ElementRef, OnInit, Renderer2  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EventService } from '../event/event.service';
import { ReactiveFormsModule } from '@angular/forms';
import { startOfToday } from 'date-fns';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  eventForm: FormGroup;
  startDate: Date;
  sliderValue: number;
  

  constructor(private fb: FormBuilder, private eventService: EventService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      duration: [1, Validators.required],
      location: ['', Validators.required],
      leader: ['', Validators.required],
    });
    this.startDate = startOfToday();
    this.sliderValue = 0.5;
  }
  ngOnInit(): void {
    this.setFocusOnFirstInput();
  }
  getControl(controlName: string) {
    return this.eventForm.get(controlName)
  }
  formatLabel(value: number): string {
    // if (value >= 1000) {
    //   return Math.round(value / 1000) + 'k';
    // }
    this.sliderValue = value;
    return `${value}`;
  }
  private setFocusOnFirstInput(): void {
    const firstInput: HTMLElement = this.elementRef.nativeElement.querySelector('input');
    if (firstInput) {
      this.renderer.selectRootElement(firstInput).focus();
    }
  }
  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value);
      this.eventForm.reset();
    }
  }
}