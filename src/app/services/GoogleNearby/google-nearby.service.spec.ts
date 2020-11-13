import { TestBed } from '@angular/core/testing';

import { GoogleNearbyService } from './google-nearby.service';

describe('GoogleNearbyService', () => {
  let service: GoogleNearbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleNearbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
