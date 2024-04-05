import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticat: boolean = true;

  constructor() {}

  isAuthenticated(): boolean {
    return this.isAuthenticat;
  }

  login(username: string, password: string): void {
    if (username === 'user' && password === 'password') {
      this.isAuthenticat = true;
    } else {
      this.isAuthenticat = false;
    }
  }

  logout(): void {
    this.isAuthenticat = false;
  }
}
