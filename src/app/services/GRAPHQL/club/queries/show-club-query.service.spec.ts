import { TestBed } from '@angular/core/testing';

import { ShowClubQueryService } from './show-club-query.service';

describe('ShowClubService', () => {
  let service: ShowClubQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowClubQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
