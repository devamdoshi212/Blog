import { EventEmitter, Injectable, Output } from '@angular/core';
import { MyHttpService } from './http.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() profileChange = new EventEmitter<string>();
  @Output() fullnameChange = new EventEmitter<string>();
  @Output() usernameChange = new EventEmitter<string>();
  @Output() emailChange = new EventEmitter<string>();
  @Output() blogCountChange = new EventEmitter<number>();

  private _profile: string = '';
  private _fullname: string = '';
  private _username: string = '';
  private _email: string = '';
  private _blogCount: number = 0;

  getprofile(): string {
    return this._profile;
  }

  setprofile(value: string) {
    this._profile = value;
    this.profileChange.emit(value);
  }

  getfullname(): string {
    return this._fullname;
  }

  setfullname(value: string) {
    this._fullname = value;
    this.fullnameChange.emit(value);
  }

  getusername(): string {
    return this._username;
  }

  setusername(value: string) {
    this._username = value;
    this.usernameChange.emit(value);
  }

  getemail(): string {
    return this._email;
  }

  setemail(value: string) {
    this._email = value;
    this.emailChange.emit(value);
  }

  getblogCount(): number {
    return this._blogCount;
  }

  setblogCount(value: number) {
    this._blogCount = value;
    this.blogCountChange.emit(value);
  }
  constructor(private http: MyHttpService) {}

  getProfile(): Observable<any> {
    return this.http.fetchGet('user/dashboard').pipe(
      map((data) => {
        this.setprofile(data.data.user?.profile?.public_url);
        this.setfullname(data.data.user.fullname);
        this.setusername(data.data.user.username);
        this.setemail(data.data.user.email);
        this.setblogCount(data.data.blogsCount);
      })
    );
  }

  postBlog(data: any): Observable<any> {
    return this.http.fetchPost('user/blog', data);
  }

  getPersonalBlog(): Observable<any> {
    return this.http.fetchGet('user/blog');
  }
}
