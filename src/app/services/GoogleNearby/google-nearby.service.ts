import { Injectable } from '@angular/core';
import { GoogleNearby } from '@ionic-native/google-nearby/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { Message } from 'capacitor-google-nearby-messages';

const { GoogleNearbyMessages } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class GoogleNearbyService {
  constructor(private googleNearby: GoogleNearby, private platform: Platform) {
    GoogleNearbyMessages.initialize({}).then((data) => console.log(data));
  }

  public read = (): Observable<any> | undefined => {
    if (this.platform.is('cordova')) GoogleNearbyMessages.subscribe({});
    // return this.googleNearby.subscribe();
    return undefined;
  };

  public broadcast = async (message: string) => {
    const messageObject: Message = {
      content: btoa(message),
      type: 'DEFAULT',
    };
    if (this.platform.is('cordova'))
      GoogleNearbyMessages.publish({ message: messageObject }).then((data) => console.log(data));
    //await this.googleNearby.publish(message);
  };
}
