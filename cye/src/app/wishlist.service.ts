import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: string[] = [];

  addToWishlist(item: string): void {
    this.wishlist.push(item);
  }

  getWishlist(): string[] {
    return this.wishlist;
  }
}
