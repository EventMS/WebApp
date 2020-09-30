import { TestBed } from '@angular/core/testing';

import { CreateUserMutationService } from './createUserMutation.service';

describe('CreateUserMutationService', () => {
  let service: CreateUserMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUserMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
