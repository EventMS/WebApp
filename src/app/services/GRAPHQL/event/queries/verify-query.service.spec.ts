import { TestBed } from '@angular/core/testing';

import { VerifyQueryService } from './verify-query.service';

describe('VerifyQueryService', () => {
  let service: VerifyQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
