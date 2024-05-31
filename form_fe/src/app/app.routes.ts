import { Routes } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventWaitlistComponent } from './waitlist/waitlist.component';
import { EventFormComponent } from './admin/event-form.component';
import { LoginComponent } from './auth/auth.component';
import { AdminEventListComponent } from './admin/admin-event-list.component';
import { LoginConfirmComponent } from './auth/login_confirm.component';
import { LoginConfirmSentComponent } from './auth/login_confirm_sent';
import { ErrComponent } from './err/err.component';
import { OuterEventList } from './event/event-list/outer-event-list.component';

export const routes: Routes = [
    {path: '', component: OuterEventList},
    {path: 'wl/:eventId', component: EventWaitlistComponent },
    {path: 'admin/add-event', component: EventFormComponent},
    {path: 'auth', component: LoginComponent},
    {path: 'auth/err', component: LoginComponent, data: { action: 'err'}},
    {path: 'auth/err/verify', component: LoginComponent, data: { action: 'errV'}},
    {path: 'err', component: ErrComponent},
    {path: 'admin', component: AdminEventListComponent},
    {
        path: 'verify-email/:userId/:token',
        component: LoginConfirmComponent,
        data: { action: 'verify' }
      },
    {
        path: 'login-confirm/:userId/:token',
        component: LoginConfirmComponent,
        data: { action: 'login' }
    },
    {
        path: 'login-confirm-sent',
        component: LoginConfirmSentComponent
    }
];
