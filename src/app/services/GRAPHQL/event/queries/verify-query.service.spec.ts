import { TestBed } from '@angular/core/testing';

import { VerifyCodeQueryService } from './verify-query.service';

describe('VerifyCodeQueryService', () => {
  let service: VerifyCodeQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyCodeQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
