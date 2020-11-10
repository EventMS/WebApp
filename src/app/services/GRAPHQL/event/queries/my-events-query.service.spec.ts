import { TestBed } from '@angular/core/testing';

import { MyEventsQueryService } from './my-events-query.service';

describe('MyEventsQueryService', () => {
  let service: MyEventsQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyEventsQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
