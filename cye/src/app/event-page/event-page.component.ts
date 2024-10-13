import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventPageService } from '../event-page.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
  
  
})
export class EventPageComponent implements OnInit {
  event: any;

  constructor(private route: ActivatedRoute, private eventService: EventPageService) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id'); // Assuming the route parameter is 'id'
    this.eventService.getEventById(eventId)
  }
}



