import { Injectable } from '@angular/core';
import { MyHttpService } from './http.service';
import { Observable, map } from 'rxjs';
import category from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  category: category[] = [];
  constructor(private http: MyHttpService) {}

  getCategory(): Observable<any> {
    return this.http.fetchGet('user/category').pipe(
      map((data) => {
        if (data.success) {
          this.category = data.data.categories;
          return data.data.categories;
        }
      })
    );
  }
}
