import { Component } from '@angular/core';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-home-normal-user',
  templateUrl: './home-normal-user.component.html',
  styleUrls: ['./home-normal-user.component.css']
})
export class HomeNormalUserComponent {

  constructor(private wishlistService: WishlistService) {}

  addToWishlist(eventName: string): void {
    this.wishlistService.addToWishlist(eventName);
    console.log(`Added to wishlist: ${eventName}`);
  }
}
