import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubSubscriptionMockService {
  watch(): Observable<any> {
    return new Observable((subscribe) => {
      subscribe.next([]);
    });
  }
}
