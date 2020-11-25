import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Message, UUID } from 'capacitor-google-nearby-messages';

const { GoogleNearbyMessages } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class GoogleNearbyService {
  constructor(private platform: Platform) {}

  public subscribe = async (callback: (data: { message: Message }) => {}) => {
    if (this.platform.is('capacitor')) {
      await GoogleNearbyMessages.subscribe({});
    }
    // @ts-ignore
    return GoogleNearbyMessages.addListener('onFound', callback);
  };

  public init = async () => {
    await GoogleNearbyMessages.initialize({ apiKey: 'AIzaSyBof-EFFsnyZnSLGYF0p1xbu5MfCVUoOUs' });
  };

  public initPermissions = async () => {
    this.init();
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
  public clean = async (uuid?: UUID) => {
    const { isSubscribing } = await GoogleNearbyMessages.status();
    if (isSubscribing) {
      await GoogleNearbyMessages.unsubscribe({});
    }
  };

  public publish = async (message: string): Promise<UUID | undefined> => {
    const messageObject: Message = {
      content: btoa(message + ':' + Math.random()),
      type: 'DEFAULT',
    };
    if (this.platform.is('capacitor')) {
      return await GoogleNearbyMessages.publish({ message: messageObject, options: { strategy: { ttlSeconds: 30 } } });
    }
  };
}
