import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginMutationService } from '../GRAPHQL/loginMutation.service';
import { ICreateUserMutation, ILoginUserMutation } from 'src/graphql_interfaces';
import { ApolloError } from '@apollo/client/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router, private loginMutationService: LoginMutationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  loginFromSignup(user: ICreateUserMutation['createUser']) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.router.navigate(['/tabs']);
  }

  login(email: string, password: string) {
    this.loginMutationService.mutate({ request: { email: email, password: password } }).subscribe(
      ({ data }) => {
        const { loginUser } = data!;
        localStorage.setItem('currentUser', JSON.stringify(loginUser));
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
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}

type User = ILoginUserMutation['loginUser'];
