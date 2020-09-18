import { Component } from '@angular/core';
import { NfcService } from 'src/app/services/nfc.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public nfcService: NfcService) {}

  async readNFC() {
    console.log('Called');
    await this.nfcService.readNFC();
  }
}
