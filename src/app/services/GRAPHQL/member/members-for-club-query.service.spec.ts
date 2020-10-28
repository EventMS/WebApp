import { TestBed } from '@angular/core/testing';

import { MembersForClubQueryService } from './members-for-club-query.service';

describe('MembersForClubQueryService', () => {
  let service: MembersForClubQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersForClubQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
