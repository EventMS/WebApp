import { TestBed } from '@angular/core/testing';

import { SignupForSubscriptionMutationService } from './signup-for-subscription-mutation.service';

describe('SignupForSubscriptionMutationService', () => {
  let service: SignupForSubscriptionMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupForSubscriptionMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
