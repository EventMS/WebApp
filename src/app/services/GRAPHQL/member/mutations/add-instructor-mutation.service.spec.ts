import { TestBed } from '@angular/core/testing';

import { AddInstructorMutationService } from './add-instructor-mutation.service';

describe('AddInstructorMutationService', () => {
  let service: AddInstructorMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddInstructorMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
