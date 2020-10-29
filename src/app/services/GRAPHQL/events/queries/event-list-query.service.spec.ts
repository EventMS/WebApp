import { TestBed } from '@angular/core/testing';

import { EventListQueryService } from './event-list-query.service';

describe('EventListQueryService', () => {
  let service: EventListQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventListQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
