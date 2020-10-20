import { TestBed } from '@angular/core/testing';

import { CreateEventMutationService } from './create-event-mutation.service';

describe('CreateEventMutationService', () => {
  let service: CreateEventMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
