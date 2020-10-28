import { TestBed } from '@angular/core/testing';

import { EventPageQueryService } from './event-page.service';

describe('EventPageQueryService', () => {
  let service: EventPageQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventPageQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
