// event-waitlist.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitlistService } from './waitlist.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

const CURR_USER: string = "Bob";

@Component({
  selector: 'app-event-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.css']
  // styleUrls: ['./event-waitlist.component.css'],
})
export class EventWaitlistComponent implements OnInit, OnDestroy {
  waitlist: string[] = [];
  s_form: FormGroup;
  totalWaitlist: number;
  private updateSubscription: Subscription | undefined;
  private eventId: string = "";

  constructor(private fb: FormBuilder, private waitlistService : WaitlistService,
    private route: ActivatedRoute, private http: HttpClient) {
      this.waitlist = ['Alice', 'Charlie', 'David', 'Eva', "Bob"];
      this.s_form = this.fb.group({
          name: ['', Validators.required], // 'name' field with required validator
          desire: [null, Validators.required],
          comment: [''], // comment field
      });
      this.totalWaitlist = 0;
  }
  getControl(controlName: string) {
    return this.s_form.get(controlName);
  }


  ngOnInit(): void {
    this.waitlistService.getWaitlistTotal(this.eventId).subscribe(
      (total: number) => {
        // Handle the total value, for example, assign it to a component property
        this.totalWaitlist = total;
      },
      (error) => {
        console.error('Error fetching waitlist total:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
    //TODO IF STATEMENT TO DO THIS
    // Get the event ID from the route parameters
    this.route.paramMap.subscribe((params : any) => {
      this.eventId = params.get('eventId');
      // Set up WebSocket connection
      const ws = new WebSocket('ws://TODO');

      // Handle WebSocket updates
      ws.addEventListener('message', (event) => {
        const newData = JSON.parse(event.data);
        this.updateWaitlist(newData);
      });

      // Periodic HTTP polling every 30 seconds
      this.updateSubscription = interval(30000).subscribe(() => {
        this.refreshWaitlist();
      });
    });
  }

  ngOnDestroy(): void {
    // Clean up resources
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  shouldRedact(name: string): boolean {
    return CURR_USER !== name
  }

  signedUp(): boolean {
    return false;
  }
  refreshWaitlist() {
    // Make an HTTP request to fetch the waitlist
    this.waitlistService.getWaitlist(this.eventId).subscribe(
      (waitlist: string[]) => {
        this.updateWaitlist(waitlist);
      },
      (error: any) => {
        console.error('Error fetching waitlist:', error);
        // Handle error, e.g., show an error message
      }
    );
  }

  cancelReservation(name: string) {
    // Make an HTTP request to cancel the reservation
    this.waitlistService.cancelReservation(this.eventId, name).subscribe(
      (response: any) => {
        console.log('Reservation canceled:', response);
        // Optionally, update the waitlist after successful cancellation
        this.refreshWaitlist();
      },
      (error: any) => {
        console.error('Cancellation failed:', error);
      }
    );
  }
  submitForm(): void {
    // s_form is used to keep track of form validation/data
    const formData = {
      // place : this.s_form.get('place')?.value,
      desire : this.s_form.get('desire')?.value, 
      comment : this.s_form.get('comment')?.value,
      user : this.s_form.get('user')?.value,
    };
    // TODO: change api
    this.http.post("http://127.0.0.1:8000/v1/bufferlist/", formData).subscribe(
      (response) => {
        console.log("api log: ", response);
        this.s_form.reset();
      },
      (error) => {
        console.error("api error: ", error)
      }
    );
  }
  private updateWaitlist(newData: string[]) {
    // Update the waitlist with new data
    this.waitlist = newData;
  }
}
