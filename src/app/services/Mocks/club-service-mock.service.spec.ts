import { TestBed } from '@angular/core/testing';

import { ClubServiceMockService } from './club-service-mock.service';

describe('ClubServiceMockService', () => {
  let service: ClubServiceMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubServiceMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
