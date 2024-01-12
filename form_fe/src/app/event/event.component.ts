// event.component.ts
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Event } from './event.model';
import { EventDetailModalComponent } from './event-actions/event-detail-modal.component';

@Component({
  selector: 'app-event',
  template: `
    <h3>{{ event.name }}</h3>
    <p>{{ event.description }}</p>
    <button mat-button (click)="openModal()"> View Details </button>
  `,
})
export class EventComponent {
  @Input() event: Event = { id: 0, name: '', description: '', dateTime: new Date(), location: ''};

  constructor(private dialog: MatDialog) {}

  openModal() {
    const dialogRef = this.dialog.open(EventDetailModalComponent, {
      width: '70%',
      data: { event: this.event },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    // });
  }
}
