import { TestBed } from '@angular/core/testing';

import { SignUpForEventMutationService } from './single-payment-mutation.service';

describe('SinglePaymentMutationService', () => {
  let service: SignUpForEventMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpForEventMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
