import { TestBed } from '@angular/core/testing';

import { ClubQueryService } from './club-query.service';

describe('ClubQueryService', () => {
  let service: ClubQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
