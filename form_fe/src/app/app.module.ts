import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { EventListComponent } from './state/event-list/event-list.component';
import { EventService } from './event-list/event.service';

@NgModule({
  declarations: [AppComponent, EventListComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, TableModule],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
