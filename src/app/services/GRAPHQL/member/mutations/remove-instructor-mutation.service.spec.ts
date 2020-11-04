import { TestBed } from '@angular/core/testing';

import { RemoveInstructorMutationService } from './remove-instructor-mutation.service';

describe('RemoveInstructorMutationService', () => {
  let service: RemoveInstructorMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveInstructorMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
