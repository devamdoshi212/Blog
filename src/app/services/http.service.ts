import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
  constructor(private http: HttpClient) {}

  fetchGet(url: string): Observable<any> {
    return this.http.get<any>('http://localhost:9999/' + url);
  }
  fetchPost(url: string, data: Object): Observable<any> {
    return this.http.post<any>('http://localhost:9999/' + url, data);
  }
}
