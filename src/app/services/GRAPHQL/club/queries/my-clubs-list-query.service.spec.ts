import { TestBed } from '@angular/core/testing';

import { MyClubsListQueryService } from './my-clubs-list-query.service';

describe('MyClubsListQueryService', () => {
  let service: MyClubsListQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyClubsListQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
