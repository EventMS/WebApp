import { TestBed } from '@angular/core/testing';

import { MyClubsQueryService } from './my-clubs-query.service';

describe('MyClubsQueryService', () => {
  let service: MyClubsQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyClubsQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
