import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginMutationService } from 'src/app/services/GRAPHQL/user/mutations/loginMutation.service'
import { CreateUserRequestInput, ICreateUserMutation, ILoginUserMutation, ILoginUserMutationVariables } from 'src/graphql_interfaces';
import { ApolloError } from '@apollo/client/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { Apollo } from 'apollo-angular';
import { Paths } from 'src/app/navigation/routes';
import { CreateUserMutationService } from './mutations/createUserMutation.service';

const current_user = 'current_user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private router: Router, private loginMutationService: LoginMutationService, private apollo: Apollo,     private createUserMutationService: CreateUserMutationService,) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(current_user)!));
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  createUser(request: CreateUserRequestInput) {
    return this.createUserMutationService
    .mutate(
      {
        request: request
      }
    )
  }

  loginFromSignup(user: ICreateUserMutation['createUser']) {
    localStorage.setItem(current_user, JSON.stringify(user!));
    this.currentUserSubject.next(user);
    this.router.navigateByUrl('', { replaceUrl: true });
  }

  login(data: ILoginUserMutationVariables['request']) {
    if (data && data.email && data.password) {
      this.loginMutationService.mutate({ request: { email: data.email, password: data.password } }).subscribe(
        ({ data }) => {
          const { loginUser } = data!;
          localStorage.setItem(current_user, JSON.stringify(loginUser));
          this.currentUserSubject.next(loginUser);
          this.apollo.client.clearStore();
          this.router.navigateByUrl('', { replaceUrl: true });
        },
        (error: ApolloError) => { 
          if (error.message.includes('credentials')) alert('Wrong username or password');
          else alert('something went wrong, please try again later');
        }
      );
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(current_user);
    this.currentUserSubject.next(null);
    this.router.navigate([Paths.start]);
  }

  public isTokenValid() {
    return dayjs().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const token = localStorage.getItem(current_user);

    if (token) {
      const decodedToken: { email: string; id: string; nbf: number; exp: number; iat: number } = jwt_decode(token);
      return dayjs.unix(decodedToken.exp);
    } else return dayjs().add(-1, 'day');
  }
}

type User = ILoginUserMutation['loginUser'];
