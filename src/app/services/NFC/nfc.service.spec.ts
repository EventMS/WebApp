import { TestBed } from '@angular/core/testing';
import { Ndef, NFC } from '@ionic-native/nfc/ngx';
import { IonicModule } from '@ionic/angular';

import { NfcService } from './nfc.service';

describe('NfcService', () => {
  let service: NfcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [NFC, Ndef],
    });
    service = TestBed.inject(NfcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
