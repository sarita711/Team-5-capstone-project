import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../services/event.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dash-company-user',
  templateUrl: './dash-company-user.component.html',
  styleUrls: ['./dash-company-user.component.css']
})
export class DashCompanyUserComponent implements OnInit {
  isModalOpen = false;
  isManageEventsOpen = false;
  isEditing = false;
  editingIndex: number | null = null;

  event: Event = {
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    image: null
  };

  events: Event[] = [];

  constructor(private eventService: EventService,private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn() || !this.authService.isCompanyUser()) {
      // Redirect to login if not a company user
      window.location.href = '/login';
    }
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        this.events = data;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditing = false;
    this.editingIndex = null;
    this.resetEvent();
  }

  toggleManageEvents() {
    this.isManageEventsOpen = !this.isManageEventsOpen;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.event.image = reader.result as string; // Store the base64 encoded string
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  }

  onSubmit() {
    if (this.isEditing && this.editingIndex !== null) {
      const id = this.events[this.editingIndex].id!;
      this.eventService.updateEvent(id, this.event).subscribe(
        updatedEvent => {
          if (this.editingIndex !== null) {
            this.events[this.editingIndex] = updatedEvent;
          }
          this.closeModal();
        },
        error => {
          console.error('Error updating event:', error);
        }
      );
    } else {
      this.eventService.createEvent(this.event).subscribe(
        newEvent => {
          this.events.push(newEvent);
          this.closeModal();
        },
        error => {
          console.error('Error creating event:', error);
        }
      );
    }
  }

  editEvent(index: number) {
    if (index >= 0 && index < this.events.length) {
      this.event = { ...this.events[index] };
      this.isEditing = true;
      this.editingIndex = index;
      this.openModal();
    }
  }

  deleteEvent(index: number) {
    if (index >= 0 && index < this.events.length) {
      const eventId = this.events[index].id!;
      this.eventService.deleteEvent(eventId).subscribe(
        () => {
          this.events.splice(index, 1);
        },
        error => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }

  resetEvent() {
    this.event = {
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      image: null
    };
  }
}