import { Injectable } from '@angular/core';
import { MyHttpService } from './http.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  profile: string = '';
  fullname: string = '';
  username: string = '';
  email: string = '';
  blogCount: number = 0;
  constructor(private http: MyHttpService) {}

  getProfile(): Observable<any> {
    return this.http.fetchGet('user/dashboard').pipe(
      map((data) => {
        this.profile = data.data.user?.profile?.public_url;
        this.fullname = data.data.user.fullname;
        this.username = data.data.user.username;
        this.email = data.data.user.email;
        this.blogCount = data.data.blogsCount;
      })
    );
  }
}
