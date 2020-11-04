import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { IRemoveInstructorMutation, IRemoveInstructorMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class RemoveInstructorMutationService extends Mutation<IRemoveInstructorMutation, IRemoveInstructorMutationVariables> {

  document = gql`
    mutation IRemoveInstructorMutation($clubId: String!, $instructorId: String!) {
      removeInstructor(clubId: $clubId, instructorId: $instructorId){
        userId
      }
    }
  `
}
