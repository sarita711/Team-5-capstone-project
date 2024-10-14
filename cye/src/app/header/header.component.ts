import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = null;
  userType: string | null = null;
  currentRoute: string | undefined; // Marked as optional

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userType = user.userType;
      } else {
        this.userEmail = null;
        this.userType = null;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url.substring(1); // Get current route without the leading '/'
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  // Method to check if user is on the normal user homepage
  isOnNormalUserHome(): boolean {
    return this.router.url.includes('home-normal-user');
  }

  // Method to check if user is on the company dashboard
  isOnCompanyDashboard(): boolean {
    return this.router.url.includes('dash-company-user');
  }

  // Method to check if user is on the wishlist page
  isOnWishlist(): boolean {
    return this.router.url.includes('wishlist');
  }
}
