import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceMock {
  constructor() {}

  mutate(): Observable<any> {
    return new Observable((subscribe) => {
      subscribe.next('Data');
    });
  }
}
