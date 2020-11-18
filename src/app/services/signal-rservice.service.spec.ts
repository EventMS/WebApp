import { TestBed } from '@angular/core/testing';

import { WebsocketService } from './signal-rservice.service';

describe('SignalRServiceService', () => {
  let service: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
