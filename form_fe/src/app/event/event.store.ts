// event.store.ts
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Event } from './event.model';

export interface EventState extends EntityState<Event> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'events' })
export class EventStore extends EntityStore<EventState, Event> {
constructor() {
    super();
}
}
