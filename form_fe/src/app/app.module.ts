import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from './material.module'
import { AppComponent } from './app.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventDetailModalComponent } from './event/event-actions/event-detail-modal.component';
import { EventService } from './event/event.service';
import { EventWaitlistComponent } from './waitlist/waitlist.component';
import { EventFormComponent } from './admin/event-form.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './auth/auth.component';
import { OtpComponent } from './auth/otp.component';
import { routes } from './app.routes'
import { AdminEventListComponent } from './admin/admin-event-list.component';
import { LoginConfirmComponent } from './auth/login_confirm.component';
import { LoginConfirmSentComponent } from './auth/login_confirm_sent';
import { ErrComponent } from './err/err.component';
import { ErrorModalComponent } from './err/err_modal.component';
import { OuterEventList } from './event/event-list/outer-event-list.component';
import { UserEventsComponent } from './event/user_event_list/user-event-list.component';
@NgModule({
  declarations: [OuterEventList, UserEventsComponent, ErrorModalComponent, ErrComponent, LoginConfirmSentComponent, LoginComponent, LoginConfirmComponent, AdminEventListComponent, OtpComponent, EventListComponent, EventFormComponent, EventWaitlistComponent, EventDetailModalComponent, EventComponent, AppComponent],
  imports: [BrowserModule, NgxMatTimepickerModule, MatSelectModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, FormsModule, MatRadioModule, ReactiveFormsModule, MaterialModule, CommonModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
