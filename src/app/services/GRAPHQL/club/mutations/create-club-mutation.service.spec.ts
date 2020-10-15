import { TestBed } from '@angular/core/testing';

import { CreateClubMutationService } from './create-club-mutation.service';

describe('CreateClubMutationService', () => {
  let service: CreateClubMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateClubMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
