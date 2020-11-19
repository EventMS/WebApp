import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { Message } from 'capacitor-google-nearby-messages';

const { GoogleNearbyMessages } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class GoogleNearbyService {
  constructor(private platform: Platform) {
    GoogleNearbyMessages.initialize({}).then((data) => console.log(data));
  }

  public subscribe = async (callback: (data: { message: Message }) => {}) => {
    if (this.platform.is('capacitor')) await GoogleNearbyMessages.subscribe({});
    //@ts-ignore
    return GoogleNearbyMessages.addListener('onFound', callback);
  };

  /**
   * unsubscribe
   */
  public async unsubscribe() {
    await GoogleNearbyMessages.unsubscribe({});
  }

  public publish = async (message: string) => {
    const messageObject: Message = {
      content: btoa(message),
      type: 'DEFAULT',
    };
    if (this.platform.is('capacitor'))
      await GoogleNearbyMessages.publish({ message: messageObject, options: { strategy: { ttlSeconds: 30 } } });
    // await this.googleNearby.publish(message);
  };
}
