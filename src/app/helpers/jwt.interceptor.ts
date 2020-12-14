import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/GRAPHQL/user/authentication.service';
import { environment } from 'src/environments/environment';

/**
 * With inspiration from
 * https://jasonwatmore.com/post/2019/08/06/angular-8-role-based-authorization-tutorial-with-example#authentication-service-ts
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    request = this.setHeader(request);
    return next.handle(request);
  }

  private setHeader(request: HttpRequest<any>): HttpRequest<any> {
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = this.authenticationService.isUserLoggedIn();
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
    }

    return request;
  }
}
