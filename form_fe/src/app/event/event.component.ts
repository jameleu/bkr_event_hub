// event.component.ts
import { Component, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Event } from './event.model';
import { EventDetailModalComponent } from './event-actions/event-detail-modal.component';

@Component({
  selector: 'app-event',
  template: `
    <div (click)="openModal()">
      <h3>{{ event.name }}</h3>
      <p>{{ event.description }}</p>
    </div>
  `,
})
export class EventComponent {
  @Input() event: Event = { id: 0, name: '', description: '' };


  constructor(private dialogService: DialogService) {}

  openModal() {
    const ref = this.dialogService.open(EventDetailModalComponent, {
      data: {
        event: this.event,
      },
      header: 'Event Details',
      width: '70%',
    });

    // ref.onHide.subscribe((result) => {
    // });
  }
}
