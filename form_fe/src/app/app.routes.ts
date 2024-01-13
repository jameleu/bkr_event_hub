import { Routes } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventWaitlistComponent } from './waitlist/waitlist.component';
import { EventFormComponent } from './admin/event-form.component'

export const routes: Routes = [
    {path: '', component: EventListComponent},
    {path: 'event-waitlist/:eventId', component: EventWaitlistComponent },
    {path: 'admin/add-event', component: EventFormComponent}
];
