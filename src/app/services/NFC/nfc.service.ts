import { Injectable } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { GoogleNearby } from '@ionic-native/google-nearby/ngx';

@Injectable({
  providedIn: 'root',
})
export class NfcService {
  constructor(private googleNearby: GoogleNearby) {}

  public read = () => {
    this.googleNearby.subscribe().subscribe((hej) => console.log(hej));
  };

  public write = () => {
    this.googleNearby
      .publish('Hello')
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  };

  // public async readNFC() {
  //   // Read NFC Tag - Android
  //   // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
  //   if (this.platform.is('android')) {
  //     let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
  //     this.readerMode = this.nfc.readerMode(flags).subscribe(
  //       (tag) => console.log('Hello' + JSON.stringify(tag)),
  //       (err) => console.log('Error reading tag', err)
  //     );
  //   }
  //   // Read NFC Tag - iOS
  //   // On iOS, a NFC reader session takes control from your app while scanning tags then returns a tag
  //   else
  //     try {
  //       let tag = await this.nfc.scanNdef();
  //       console.log(JSON.stringify(tag));
  //     } catch (err) {
  //       console.log('Error reading tag', err);
  //     }
  // }
}
