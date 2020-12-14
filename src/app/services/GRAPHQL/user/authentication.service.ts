import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginMutationService } from 'src/app/services/GRAPHQL/user/mutations/loginMutation.service';
import {
  CreateUserRequestInput,
  ICreateUserMutation,
  ILoginUserMutation,
  ILoginUserMutationVariables,
} from 'src/graphql_interfaces';
import { ApolloError } from '@apollo/client/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { Apollo } from 'apollo-angular';
import { Paths } from 'src/app/navigation/routes';
import { CreateUserMutationService } from './mutations/createUserMutation.service';

const currentUser = 'current_user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(
    private router: Router,
    private loginMutationService: LoginMutationService,
    private apollo: Apollo,
    private createUserMutationService: CreateUserMutationService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(currentUser)!));
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public isUserLoggedIn = () => {
    return this.currentUserValue !== null && this.isTokenValid();
  };

  createUser(request: CreateUserRequestInput) {
    return this.createUserMutationService.mutate({
      request,
    });
  }

  loginFromSignup(user: ICreateUserMutation['createUser']) {
    localStorage.setItem(currentUser, JSON.stringify(user!));
    this.currentUserSubject.next(user);
    this.apollo.client.clearStore();
    this.router.navigateByUrl('', { replaceUrl: true });
  }

  login(data: ILoginUserMutationVariables['request']) {
    if (data && data.email && data.password) {
      this.loginMutationService.mutate({ request: { email: data.email, password: data.password } }).subscribe(
        ({ data }) => {
          const { loginUser } = data!;
          localStorage.setItem(currentUser, JSON.stringify(loginUser));
          this.currentUserSubject.next(loginUser);
          this.apollo.client.clearStore();
          this.router.navigateByUrl('', { replaceUrl: true });
        },
        (error: ApolloError) => {
          if (error.message.includes('resource') || error.message.includes('currentUser')) {
            return;
          }

          if (error.message.includes('credentials')) {
            alert('Wrong username or password');
          }
        }
      );
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(currentUser);
    this.currentUserSubject.next(null);
    this.apollo.client.clearStore();
    this.router.navigate([Paths.start]);
  }

  private isTokenValid() {
    return dayjs().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const token = localStorage.getItem(currentUser);

    if (token) {
      const decodedToken: { email: string; id: string; nbf: number; exp: number; iat: number } = jwt_decode(token);
      return dayjs.unix(decodedToken.exp);
    } else {
      return dayjs().add(-1, 'day');
    }
  }
}

type User = ILoginUserMutation['loginUser'];
