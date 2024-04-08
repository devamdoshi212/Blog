import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export default (role: string) => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    // const authService = inject(AuthService);
    // if (authService.isAuthenticated()) {
    //   return true;
    // } else {
    //   return createUrlTreeFromSnapshot(route, ['']);
    // }
  };
};
