import { Component, ElementRef, OnInit, Renderer2  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event/event.service';
import {Event} from '../event/event.model';
import { parse, format, getMinutes, addMinutes, formatISO } from 'date-fns';

function parseTimeString(timeString: string, date: Date): Date {
  const parsedDate = parse(timeString, 'hh:mm a', date);
  return parsedDate;
}
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  value: number = 0; 
  minValue: number = 4;
  maxValue: number = 16;
  eventForm: FormGroup;
  sliderValue: number;
  selectedOption: String;
  is_edit: Boolean = false;
  event_id: number = -1;

  constructor(private fb: FormBuilder, private elementRef: ElementRef, private renderer: Renderer2, private eventService: EventService, private route: ActivatedRoute,
    private router: Router) {
    
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      duration: [0, Validators.required],
      cap: [0, [Validators.required, Validators.max(16), Validators.min(4)]],
      cat: [[], Validators.required],
      location: ['', Validators.required],
      file: [null],
      leader: ['', Validators.required],
    });
    this.selectedOption = "Bread"
    this.sliderValue = 0.5;
  }
  ngOnInit(): void {
    this.setFocusOnFirstInput();
    this.route.params.subscribe(params => {
      this.event_id = params['id'];
      if (this.event_id >= 0) {
        // this.loadEvent();
        this.is_edit = true;
      }
    });
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
  increment() {
    if (this.value < this.maxValue) {
      this.value++;
    }
  }

  decrement() {
    if (this.value > this.minValue) {
      this.value--;
    }
  }

  onChange() {
    if (this.value < this.minValue) {
      this.value = this.minValue;
    } else if (this.value > this.maxValue) {
      this.value = this.maxValue;
    }
  }
  // loadEvent(): void {
  //   this.eventService.getEventById(this.event_id).subscribe((event: Event) => {
  //     this.eventForm.patchValue({
  //       name: event.name,
  //       description: event.description,
  //       date: "0",
  //       duration: event.duration,
  //       cap: event.cap,
  //       cat: event.cat,
  //       location: event.location,
  //       leader: event.leader,
  //     });
  //   });
  // }

  onSubmit(): void {

    if (this.eventForm.valid) {
      const parsed_date = parseTimeString(this.eventForm.get('time')?.value, this.eventForm.get('date')?.value);
      const start_time = formatISO(parsed_date, {representation: 'complete'});
      const end_date = new Date(parsed_date);
      const hrs_in_min = 60 * this.eventForm.get('duration')?.value;
      const end_time = addMinutes(parsed_date, hrs_in_min);
      //TODO as needed: since we are not holding events overnight or close to midnight, we don't need to change the date, only the time. if have time later, can update.
      end_date.setHours(end_time.getHours(), end_time.getMinutes(), end_time.getSeconds());
      const final_end_time = formatISO(end_date, { representation: 'complete' });

      const file = this.eventForm.get('filename')?.value as File;
      let fileUrl = "default";
      if(file != null) {
        this.eventService.uploadFile(file).subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
            fileUrl = response.file_url;
          },
          (error) => {
            console.error('File upload failed:', error);
            return;
          }
        );
      }
      const categories = this.eventForm.get('cat')?.value;
      const category_str = categories.map((category: string) => category.toString()).join(',');
      const new_data = {
        name: this.eventForm.get('name')?.value,
        category: category_str,
        capacity: this.eventForm.get('cap')?.value,
        desc: this.eventForm.get('description')?.value,
        location: this.eventForm.get('location')?.value,
        start_date: start_time,
        end_date: final_end_time,
        //todo
        leader_creator: 1,
        file_url: fileUrl
      };
      console.log(new_data);
      console.log(this.event_id);
      if (this.event_id >= 0) {
        this.eventService.updateEvent(this.event_id, new_data).subscribe(response => {
          console.log("updated event");
          this.router.navigate(['/admin']);
        }, error => {
          console.error('Error updating event:', error);
        });
      } else {
        this.eventService.createEvent(new_data).subscribe(response => {
          this.router.navigate(['/admin']);
        }, error => {
          console.log("created event");
          console.error('Error creating event:', error);
        });
      }
    }
  }
}