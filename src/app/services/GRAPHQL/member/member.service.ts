import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AddInstructorMutationService } from './mutations/add-instructor-mutation.service';
import { RemoveInstructorMutationService } from './mutations/remove-instructor-mutation.service';
import { MembersForClubQueryService } from './queries/members-for-club-query.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(
    private addInstructorMutation: AddInstructorMutationService,
    private removeInstructorMutation: RemoveInstructorMutationService,
    private membersForClubQuery: MembersForClubQueryService
  ) {}

  addInstructor(clubId: string, instructorId: string) {
    return this.addInstructorMutation.mutate(
      { clubId: clubId, instructorId: instructorId },
      {
        refetchQueries: [
          {
            query: this.membersForClubQuery.document,
            variables: { clubId: clubId },
          },
        ],
      }
    );
  }

  removeInstructor(clubId: string, instructorId: string) {
    return this.removeInstructorMutation.mutate(
      { clubId: clubId, instructorId: instructorId },
      {
        refetchQueries: [
          {
            query: this.membersForClubQuery.document,
            variables: { clubId: clubId },
          },
        ],
      }
    );
  }

  getMembers(clubId: string) {
    return this.membersForClubQuery.watch({ clubId: clubId }).valueChanges.pipe(map((value) => value.data));
  }
}
