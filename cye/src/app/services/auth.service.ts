// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  email: string;
  password: string;
  userType: string;
  companyId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Update with your API URL
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap((user: User) => {
        // Update the current user subject with the logged-in user
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isCompanyUser(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.userType === 'company';
  }
}
