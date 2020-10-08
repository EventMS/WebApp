import { TestBed } from '@angular/core/testing';

import { ClubSubscriptionsQueryService } from './club-subscriptions-query.service';

describe('ClubSubscriptionsQueryService', () => {
  let service: ClubSubscriptionsQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubSubscriptionsQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
