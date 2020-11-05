import { TestBed } from '@angular/core/testing';

import { VerifyCodeMutationService } from './verify-mutation.service';

describe('VerifyCodeMutationService', () => {
  let service: VerifyCodeMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyCodeMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
