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

  public init = () => {
    GoogleNearbyMessages.initialize({ apiKey: 'AIzaSyBof-EFFsnyZnSLGYF0p1xbu5MfCVUoOUs' });
  };

  /**
   * unsubscribe
   */
  public clean = async (uuid?: UUID) => {
    const { isSubscribing, isPublishing } = await GoogleNearbyMessages.status();
    if (isSubscribing) {
      await GoogleNearbyMessages.unsubscribe({});
    }
    if (isPublishing && uuid) {
      await GoogleNearbyMessages.unpublish({ uuid });
    }
  };

  public publish = async (message: string): Promise<void> => {
    const messageObject: Message = {
      content: btoa(message),
      type: 'DEFAULT',
    };
    if (this.platform.is('capacitor')) {
      await GoogleNearbyMessages.publish({ message: messageObject, options: { strategy: { ttlSeconds: 30 } } });
    }
  };
}
