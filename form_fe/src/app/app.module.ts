import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MaterialModule } from './material.module'
import { AppComponent } from './app.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventDetailModalComponent } from './event/event-actions/event-detail-modal.component';
import { EventService } from './event/event.service';
import { EventComponent } from './event/event.component';
import { routes } from './app.routes'

@NgModule({
  declarations: [EventListComponent, EventDetailModalComponent, EventComponent, AppComponent],
  imports: [BrowserModule, MaterialModule, MatIconModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
