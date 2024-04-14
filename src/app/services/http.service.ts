import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
  constructor(private http: HttpClient) {}

  fetchGet(url: string): Observable<any> {
    return this.http.get<any>('https://blog-xikb.onrender.com/' + url);
  }
  fetchPost(url: string, data: Object): Observable<any> {
    return this.http.post<any>('https://blog-xikb.onrender.com/' + url, data);
  }
  fetchDelete(url: string, data: Object): Observable<any> {
    return this.http.delete<any>('https://blog-xikb.onrender.com/' + url, data);
  }
  fetchPatch(url: string, data: Object): Observable<any> {
    return this.http.patch<any>('https://blog-xikb.onrender.com/' + url, data);
  }
}
