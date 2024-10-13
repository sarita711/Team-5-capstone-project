// home-normal-user.component.ts
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
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  // home-normal-user.component.ts
addToWishlist(event: Event): void {
  const wishlistItem: WishlistItem = {
      userId: 1, // Replace with the actual logged-in user ID
      eventId: event.id!, // Use the non-null assertion operator (!) to ensure `id` is defined
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      image: event.image || 'assets/images/default-event.jpg' // Use default image if none
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
