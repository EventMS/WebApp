import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationMockService {
  constructor() {}

  login(email, password): Observable<any> {
    return new Observable((subscribe) => {
      subscribe.next('Data');
    });
  }
}
