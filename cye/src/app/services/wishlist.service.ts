// wishlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// wishlist.service.ts
export interface WishlistItem {
  id?: number; // Optional, as this might not be assigned when adding
  userId: number;
  eventId: number; // Ensure this is always a number
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image?: string; // Allow undefined by making it optional
}



@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8080/api/wishlist'; // Your backend API URL

  constructor(private http: HttpClient) {}

  getWishlist(userId: number): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.apiUrl}/${userId}`);
  }

  addToWishlist(item: WishlistItem): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(this.apiUrl, item);
  }

  removeFromWishlist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
