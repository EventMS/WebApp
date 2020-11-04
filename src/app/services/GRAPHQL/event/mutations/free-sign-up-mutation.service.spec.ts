import { TestBed } from '@angular/core/testing';

import { FreeSignUpMutationService } from './free-sign-up-mutation.service';

describe('FreeSignUpMutationService', () => {
  let service: FreeSignUpMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeSignUpMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
