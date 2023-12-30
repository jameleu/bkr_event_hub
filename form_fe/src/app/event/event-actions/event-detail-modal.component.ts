// event-detail-modal.component.ts
import { Component, Input } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Event } from '../event.model'; // Adjust the import path based on your project structure

@Component({
  selector: 'app-event-detail-modal',
  template: `
    <div>
      <h4>{{ event.name }}</h4>
      <p>{{ event.description }}</p>
      <!-- Add more details or customize as needed -->
    </div>
  `,
})
export class EventDetailModalComponent {
    @Input() event: Event = { id: 0, name: '', description: '' };

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  // Optionally, you can handle modal close logic here
  onClose() {
    this.ref.close(/* any result you want to pass back to the caller */);
  }
}
