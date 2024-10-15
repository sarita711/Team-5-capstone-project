// wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { WishlistService, WishlistItem } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    const userId = 1; // Replace with the actual logged-in user ID
    this.loadWishlist(userId);
  }

  loadWishlist(userId: number): void {
    this.wishlistService.getWishlist(userId).subscribe(
      (data) => {
        this.wishlist = data;
      },
      (error) => {
        console.error('Error fetching wishlist:', error);
      }
    );
  }

  removeFromWishlist(event: WishlistItem): void {
    if (event.id) {
      this.wishlistService.removeFromWishlist(event.id).subscribe(
        () => {
          this.wishlist = this.wishlist.filter(item => item.id !== event.id);
          console.log(`Removed from wishlist: ${event.title}`);
        },
        (error) => {
          console.error('Error removing item from wishlist:', error);
        }
      );
    }
  }
}
