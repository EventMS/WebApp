import { TestBed } from '@angular/core/testing';

import { CreateSubscriptionMutationService } from './create-subscription-mutation.service';

describe('CreateSubscriptionMutationService', () => {
  let service: CreateSubscriptionMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSubscriptionMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
