import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Paths } from '../navigation/routes';
import { AuthenticationService } from '../services/GRAPHQL/user/authentication.service';

/**
 * With inspiration from
 * https://jasonwatmore.com/post/2019/08/06/angular-8-role-based-authorization-tutorial-with-example#authentication-service-ts
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { url } = state;

    if (this.authenticationService.isUserLoggedIn()) {
      // check if route is restricted by role
      // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
      //   // role not authorised so redirect to home page
      //   this.router.navigate(['/']);
      //   return false;
      // }
      // authorised so return true
      return true;
    }

    if (url === 'login') {
      alert('Wrong credentials');
    } else {
      this.router.navigate([Paths.start]);
    }

    // not logged in so redirect to login page with the return url

    return false;
  }
}
