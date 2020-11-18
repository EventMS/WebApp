import { TestBed } from '@angular/core/testing';

import { EventUserListQueryService } from './event-user-list-query.service';

describe('EventUserListQueryService', () => {
  let service: EventUserListQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventUserListQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
