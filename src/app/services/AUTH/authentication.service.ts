import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginMutationService } from '../GRAPHQL/loginMutation.service';
import { ILoginUserMutation } from 'src/graphql_interfaces';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private loginMutationService: LoginMutationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return true
    /* this.loginMutationService
      .mutate({ request: { email: email, password: password } })
      .subscribe(({ data, errors }) => {
        console.log('subscribe has been called')
        if (errors || !data) {
          console.log(errors)
          this.logout();
        }
        else {
          const { loginUser } = data;
          localStorage.setItem('currentUser', JSON.stringify(loginUser));
          this.currentUserSubject.next(loginUser);
          return loginUser;
        }
      }); */
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

type User = ILoginUserMutation['loginUser'];
