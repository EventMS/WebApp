import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginMutationService } from '../GRAPHQL/loginMutation.service';
import { ICreateUserMutation, ILoginUserMutation } from 'src/graphql_interfaces';
import { ApolloError } from '@apollo/client/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const expires_at = 'expires_at';
const current_user = 'current_user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router, private loginMutationService: LoginMutationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(current_user)!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    console.log(jwt_decode(this.currentUserSubject.value.token));
    return this.currentUserSubject.value;
  }

  loginFromSignup(user: ICreateUserMutation['createUser']) {
    localStorage.setItem(current_user, JSON.stringify(user));
    localStorage.setItem(expires_at, JSON.stringify(jwt_decode(user.token)));
    this.currentUserSubject.next(user);
    this.router.navigate(['/tabs']);
  }

  login(email: string, password: string) {
    this.loginMutationService.mutate({ request: { email: email, password: password } }).subscribe(
      ({ data }) => {
        const { loginUser } = data!;
        localStorage.setItem(current_user, JSON.stringify(loginUser));
        localStorage.setItem(expires_at, JSON.stringify(jwt_decode(loginUser.token)));
        this.currentUserSubject.next(loginUser);
        this.router.navigate(['/tabs']);
      },
      (error: ApolloError) => {
        if (error.message.includes('credentials')) alert('Wrong username or password');
        else alert('something went wrong, please try again later');
      }
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(current_user);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  public isTokenExpired() {
    return dayjs().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem(expires_at);
    const expiresAt = JSON.parse(expiration);
    return dayjs(expiresAt);
  }
}

type User = ILoginUserMutation['loginUser'];
