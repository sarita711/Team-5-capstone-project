// event-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
})
export class EventPageComponent implements OnInit {
  event: any;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id'); // Get the event ID from the route
    console.log('Event ID:', eventId); // Check if the event ID is being fetched correctly
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(
        (data) => {
          console.log('Event Data:', data); // Log the data fetched from the API
          this.event = data;
        },
        (error) => {
          console.error('Error fetching event:', error);
        }
      );
    }
  }
  
}
