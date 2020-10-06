import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubServiceMockService {

  constructor() { }

  createClub(): Observable<any> {
    return new Observable(subscribe => {
      subscribe.next("Data")
    })
  }
}