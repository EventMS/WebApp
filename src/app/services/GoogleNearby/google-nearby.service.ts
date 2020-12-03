import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Message } from 'capacitor-google-nearby-messages';

const { GoogleNearbyMessages } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class GoogleNearbyService {
  constructor(private platform: Platform) {}

  public subscribe = async (messageRecievedCallback: (data: { message: Message }) => {}) => {
    if (this.platform.is('capacitor')) {
      GoogleNearbyMessages.addListener('onFound', messageRecievedCallback);

      await GoogleNearbyMessages.subscribe({});
    }
  };

  public init = async () => {
    if (this.platform.is('capacitor')) {
      await GoogleNearbyMessages.initialize({ apiKey: 'AIzaSyBof-EFFsnyZnSLGYF0p1xbu5MfCVUoOUs' });
    }
  };

  public initPermissions = async () => {
    if (this.platform.is('capacitor')) {
      const messageObject: Message = {
        content: btoa('init'),
        type: 'INIT',
      };
      await GoogleNearbyMessages.publish({
        message: messageObject,
        options: { strategy: { ttlSeconds: 8 } },
      });
    }
  };

  // /**
  //  * unsubscribe
  //  */
  public clean = async () => {
    if (this.platform.is('capacitor')) {
      const { isSubscribing } = await GoogleNearbyMessages.status();
      if (isSubscribing) {
        await GoogleNearbyMessages.unsubscribe({});
      }
    }
  };

  public publish = async (message: string): Promise<void> => {
    if (message) {
      const messageObject: Message = {
        content: btoa(message + ':' + (Math.random() * 1000 + 1)),
        type: 'DEFAULT',
      };
      if (this.platform.is('capacitor') && messageObject.content !== undefined) {
        await GoogleNearbyMessages.publish({
          message: messageObject,
          options: { strategy: { ttlSeconds: 30 } },
        });
      }
    }
  };
}
