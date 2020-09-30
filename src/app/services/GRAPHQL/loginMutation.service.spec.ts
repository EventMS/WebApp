import { TestBed } from '@angular/core/testing';

import { LoginMutationService } from './loginMutation.service';

describe('LoginMutationService', () => {
  let service: LoginMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
