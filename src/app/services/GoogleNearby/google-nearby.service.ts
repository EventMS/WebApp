import { Injectable } from '@angular/core';
import { GoogleNearby } from '@ionic-native/google-nearby/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GoogleNearbyService {
  constructor(private googleNearby: GoogleNearby, private platform: Platform) {}

  public read = (): Observable<any> | undefined => {
    if (this.platform.is('cordova')) return this.googleNearby.subscribe();
    return undefined;
  };

  public broadcast = async (message: string) => {
    if (this.platform.is('cordova')) await this.googleNearby.publish(message);
  };
}
