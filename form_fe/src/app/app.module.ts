import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'

import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventService } from './event/event.service';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [EventListComponent, EventComponent, AppComponent],
  imports: [BrowserModule, MatDialogModule, MatButtonModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
