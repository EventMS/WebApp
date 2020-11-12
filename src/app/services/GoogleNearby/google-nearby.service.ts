import { Injectable, OnDestroy } from '@angular/core';
import { GoogleNearby } from '@ionic-native/google-nearby/ngx';

@Injectable({
  providedIn: 'root',
})
export class GoogleNearbyService {
  constructor(private googleNearby: GoogleNearby) {}

  public read = () => {
    return this.googleNearby.subscribe();
  };

  public broadcast = (message: string) => {
    this.googleNearby.publish(message);
  };
}
