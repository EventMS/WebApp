import { TestBed } from '@angular/core/testing';

import { VerifyPopupQueryService } from './verify-popup-query.service';

describe('VerifyPopupQueryService', () => {
  let service: VerifyPopupQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyPopupQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
