import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../services/event.service';
import { WishlistService, WishlistItem } from '../wishlist.service';

@Component({
  selector: 'app-home-normal-user',
  templateUrl: './home-normal-user.component.html',
  styleUrls: ['./home-normal-user.component.css']
})
export class HomeNormalUserComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadEvents(); // Load all events on component initialization
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.events = data; // Assign the loaded events to the local events array
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  addToWishlist(event: Event): void {
    const wishlistItem: WishlistItem = {
      userId: 1, // Replace with the actual logged-in user ID
      eventId: event.id!, // Use non-null assertion operator (!) to ensure `id` is defined
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      image: event.imageUrl // Use imageUrl property directly for wishlist item
    };

    this.wishlistService.addToWishlist(wishlistItem).subscribe(
      () => {
        console.log(`Added to wishlist: ${event.title}`);
      },
      (error) => {
        console.error('Error adding to wishlist:', error);
      }
    );
  }
}
