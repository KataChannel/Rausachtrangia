import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private user = signal<{ token: string; user: any } | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post<any>('/api/login', credentials)
      .subscribe(response => {
        this.user.set(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile']);
      });
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUser() {
    return this.user();
  }

  isLoggedIn() {
    return this.user() !== null && !!this.user()?.token;
  }
}