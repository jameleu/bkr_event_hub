// event.component.ts
import { Component, Input } from '@angular/core';
import { Event } from './event.model';

@Component({
  selector: 'app-event',
  template: `
    <div>
      <h3>{{ event.name }}</h3>
      <p>{{ event.description }}</p>
    </div>
  `,
})
export class EventComponent {
    @Input() event!: Event;
  }  
