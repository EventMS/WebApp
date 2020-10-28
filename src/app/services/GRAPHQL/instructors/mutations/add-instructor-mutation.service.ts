import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { IAddInstructorMutation, IAddInstructorMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class AddInstructorMutationService extends Mutation<IAddInstructorMutation, IAddInstructorMutationVariables> {

  document = gql`
    mutation IAddInstructorMutation($clubId: Uuid!, $instructorId: Uuid!) {
      addInstructor(clubId: $clubId, instructorId: $instructorId){
        userId
      }
    }
  `
}
