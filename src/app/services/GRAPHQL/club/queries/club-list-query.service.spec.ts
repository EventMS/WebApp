import { TestBed } from '@angular/core/testing';

import { ClubListQueryService } from './club-list-query.service';

describe('ClubListQueryService', () => {
  let service: ClubListQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubListQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
