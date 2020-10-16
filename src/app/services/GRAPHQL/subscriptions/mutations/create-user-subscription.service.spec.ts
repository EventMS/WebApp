import { TestBed } from '@angular/core/testing';

import { CreateClubMemberMutationService } from './create-user-subscription.service';

describe('CreateUserSubscriptionService', () => {
  let service: CreateClubMemberMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateClubMemberMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
