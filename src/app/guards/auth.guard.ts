import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MyHttpService } from '../services/http.service';
import { map } from 'rxjs';

export default (role: string) => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const http = inject(MyHttpService);
    if (role == 'ADMIN') {
      return http.fetchGet('admin/verify').pipe(
        map((data) => {
          if (data.success) return true;
          return createUrlTreeFromSnapshot(route, ['/login']);
        })
      );
    } else if (role == 'USER') {
      return http.fetchGet('user/verify').pipe(
        map((data) => {
          if (data.success) return true;
          return createUrlTreeFromSnapshot(route, ['/login']);
        })
      );
    } else {
      return createUrlTreeFromSnapshot(route, ['/login']);
    }
  };
};
