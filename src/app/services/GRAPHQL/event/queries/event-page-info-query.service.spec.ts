import { TestBed } from '@angular/core/testing';

import { EventPageInfoQueryService } from './event-page-info-query.service';

describe('EventPageInfoQueryService', () => {
  let service: EventPageInfoQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventPageInfoQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
