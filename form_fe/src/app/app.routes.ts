import { Routes } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventWaitlistComponent } from './waitlist/waitlist.component';

export const routes: Routes = [
    {path: '', component: EventListComponent},
    { path: 'event-waitlist/:eventId', component: EventWaitlistComponent },
];
