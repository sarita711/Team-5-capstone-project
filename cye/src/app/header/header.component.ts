// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = null;
  userType: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to changes in the current user
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userType = user.userType;
      } else {
        this.userEmail = null;
        this.userType = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
