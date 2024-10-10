import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventPageService {
  getEventById(eventId: string | null) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
