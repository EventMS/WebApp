import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IVerifyCodeMutationVariables, IVerifyCodeQueryVariables } from 'src/graphql_interfaces';
import { VerifyCodeMutationService } from './queries/verify-mutation.service';
import { VerifyCodeQueryService } from './queries/verify-query.service';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  constructor(
    private verifyCodeQueryService: VerifyCodeQueryService,
    private verifyCodeMutationService: VerifyCodeMutationService
  ) {}

  getVerificationCodes = ({ eventId }: IVerifyCodeQueryVariables) => {
    return this.verifyCodeQueryService.watch({ eventId }).valueChanges.pipe(map(({ data }) => data));
  };

  verifyCode = ({ request }: IVerifyCodeMutationVariables) => {
    const refetchVar = request?.eventId;
    return this.verifyCodeMutationService.mutate(
      { request },
      {
        refetchQueries: [{ query: this.verifyCodeQueryService.document, variables: { eventId: refetchVar } }],
        awaitRefetchQueries: true,
      }
    );
  };
}
