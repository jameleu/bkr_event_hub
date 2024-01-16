import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AuthService
 } from './auth/auth.service';

@NgModule({
  declarations: [LoginComponent, OtpComponent, EventListComponent, EventFormComponent, EventWaitlistComponent, EventDetailModalComponent, EventComponent, AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, MaterialModule, CommonModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [EventService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
