import { Injectable } from '@angular/core';
import { MyHttpService } from './http.service';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: MyHttpService) {}

  login(data: any): Observable<any> {
    return this.http.fetchPost('login', data).pipe(
      map((data: any) => {
        if (data && data.success) {
          localStorage.setItem('token', data.data.token);
          return data;
        } else {
          localStorage.removeItem('token');
          return data;
        }
      })
    );
  }

  logout(): void {}
}
