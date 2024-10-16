// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is logged in and is a company user
    if (this.authService.isLoggedIn() && this.authService.isCompanyUser()) {
      return true; // Allow access
    } else {
      // Redirect to login page if not logged in or not a company user
      this.router.navigate(['/login']);
      return false;
    }
  }
}
