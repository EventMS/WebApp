import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IVerifyCodeQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class VerifyCodeQueryService extends Query<IVerifyCodeQuery> {
  document = gql`
    query IVerifyCodeQuery {
      currentUser {
        events {
          code
          eventId
        }
      }
    }
  `;
}
