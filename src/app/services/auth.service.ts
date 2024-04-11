import { Injectable } from '@angular/core';
import { MyHttpService } from './http.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import login from '../models/login';
import register from '../models/register';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: MyHttpService, private router: Router) {}

  login(data: login): Observable<any> {
    return this.http.fetchPost('login', data).pipe(
      map((data: any) => {
        if (data && data.success) {
          this.setToken(data.data.token);
          return data;
        } else {
          return data;
        }
      })
    );
  }

  register(data: register): Observable<any> {
    return this.http.fetchPost('signup', data).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getRole(): string {
    return localStorage.getItem('role') ?? '';
  }
  setRole(role: string): void {
    localStorage.setItem('role', role);
  }
}
