import { Injectable, Query } from '@angular/core';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class VerifyQueryService extends Query {
  document = gql`
    mutation IVerifyCode($request: VerifyCodeRequestInput) {
      verifyCode(request: $request) {
        status
      }
    }
  `;
}
