import { TestBed } from '@angular/core/testing';

import { CreateEventClubQueryService } from './create-event-club-query.service';

describe('CreateEventClubQueryService', () => {
  let service: CreateEventClubQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventClubQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
