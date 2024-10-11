import { Component } from '@angular/core';

interface Event {
  title: string;
  description: string;
  date: string;
  venue: string;
  image: string;
}

@Component({
  selector: 'app-dash-company-user',
  templateUrl: './dash-company-user.component.html',
  styleUrls: ['./dash-company-user.component.css']
})
export class DashCompanyUserComponent {
  isModalOpen = false;
  isManageEventsOpen = false;
  isEditing = false;
  editingIndex: number | null = null;
  event: Event = {
    title: '',
    description: '',
    date: '',
    venue: '',
    image: ''
  };
  events: Event[] = [];

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
    const file = event.target.files; // Access the first file
    const reader = new FileReader();
    reader.onload = () => {
      this.event.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.isEditing && this.editingIndex !== null) {
      this.events[this.editingIndex] = { ...this.event };
    } else {
      this.events.push({ ...this.event });
    }
    this.closeModal();
  }

  editEvent(index: number) {
    this.event = { ...this.events[index] };
    this.isEditing = true;
    this.editingIndex = index;
    this.openModal();
  }

  deleteEvent(index: number) {
    this.events.splice(index, 1);
  }

  resetEvent() {
    this.event = {
      title: '',
      description: '',
      date: '',
      venue: '',
      image: ''
    };
  }
}
