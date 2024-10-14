import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Event {
  id?: number; // Optional ID for the backend
  title: string;
  description: string;
  date: string;
  time: string; // Include time
  venue: string;
  image: string | null; // Change to string for base64 or null
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events'; // Your API URL

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  createEvent(event: Event): Observable<Event> {
    // Send the event directly as a JSON object
    return this.http.post<Event>(this.apiUrl, event).pipe(
      catchError(error => {
        console.error('Error creating event:', error);
        return throwError(error);
      })
    );
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    // Send the updated event data as JSON
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event).pipe(
      catchError(error => {
        console.error('Error updating event:', error);
        return throwError(error);
      })
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting event:', error);
        return throwError(error);
      })
    );
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error retrieving event:', error);
        return throwError(error);
      })
    );
  }
}
