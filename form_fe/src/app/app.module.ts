import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'

import { AppComponent } from './app.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventService } from './event/event.service';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [EventListComponent, EventComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [EventService],
  bootstrap: [AppComponent],
  // schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
