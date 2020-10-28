import { TestBed } from '@angular/core/testing';

import { ClubSubscriptionMockService } from './club-subscription-mock.service';

describe('ClubSubscriptionMockService', () => {
  let service: ClubSubscriptionMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubSubscriptionMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
