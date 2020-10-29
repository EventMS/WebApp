import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Paths } from '../navigation/routes';
import { AuthenticationService } from '../services/AUTH/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { url } = state;
    const currentUser = this.authenticationService.currentUserValue;
    const isTokenValid = this.authenticationService.isTokenValid();

    if (currentUser && isTokenValid) {
      console.log(currentUser.token);

      // check if route is restricted by role
      // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
      //   // role not authorised so redirect to home page
      //   this.router.navigate(['/']);
      //   return false;
      // }
      // authorised so return true
      return true;
    }

    if (url === '/') this.router.navigate([Paths.start]);
    else if (url === 'login') alert('Wrong credentials');

    // not logged in so redirect to login page with the return url

    return false;
  }
}
