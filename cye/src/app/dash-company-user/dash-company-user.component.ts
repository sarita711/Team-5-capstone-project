import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../services/event.service';

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
    time: '', // Add this line
    venue: '',
    image: ''
  };

  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents(); // Load events on component initialization
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
    const file = event.target.files[0]; // Access the first file
    const reader = new FileReader();
    reader.onload = () => {
      this.event.image = reader.result as string;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.isEditing && this.editingIndex !== null) {
      const id = this.events[this.editingIndex].id!; // Use non-null assertion
      this.eventService.updateEvent(id, { ...this.event }).subscribe(
        updatedEvent => {
          // Make sure editingIndex is not null before accessing it
          if (this.editingIndex !== null) {
            this.events[this.editingIndex] = updatedEvent; // Update local array
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
          this.events.push(newEvent); // Add new event to local array
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
      this.editingIndex = index; // Assigning the index
      this.openModal();
    }
  }

  deleteEvent(index: number) {
    if (index >= 0 && index < this.events.length) {
      const eventId = this.events[index].id!;
      this.eventService.deleteEvent(eventId).subscribe(
        () => {
          this.events.splice(index, 1); // Remove event from local array
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
      time: '', // Add this line
      venue: '',
      image: ''
    };
  }
}
