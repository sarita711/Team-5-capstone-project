import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-dash-company-user',
  templateUrl: './dash-company-user.component.html',
  styleUrls: ['./dash-company-user.component.css']
})
export class DashCompanyUserComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = {
    id: undefined,
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    image: ''
  };
  isCreateEvent = false;
  isManageEvent = false;
  isAllEvents = false;
  selectedFile: File | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadAllEvents();
  }

  toggleCreateEvent() {
    this.isCreateEvent = true;
    this.isManageEvent = false;
    this.isAllEvents = false;
  }

  toggleManageEvent() {
    this.isCreateEvent = false;
    this.isManageEvent = true;
    this.isAllEvents = false;
  }

  toggleAllEvents() {
    this.isCreateEvent = false;
    this.isManageEvent = false;
    this.isAllEvents = true;
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      this.eventService.uploadImage(formData).subscribe((imageUrl) => {
        this.newEvent.image = imageUrl;
        this.eventService.createEvent(this.newEvent).subscribe(() => {
          this.loadAllEvents();
          this.resetForm();
        });
      });
    } else {
      this.eventService.createEvent(this.newEvent).subscribe(() => {
        this.loadAllEvents();
        this.resetForm();
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  editEvent(event: Event) {
    this.newEvent = { ...event };
    this.isCreateEvent = true;
    this.isManageEvent = false;
    this.isAllEvents = false;
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadAllEvents();
    });
  }

  loadAllEvents() {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  resetForm() {
    this.newEvent = {
      id: undefined,
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      image: ''
    };
    this.selectedFile = null;
  }
}
