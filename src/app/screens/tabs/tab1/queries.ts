import { gql } from 'apollo-angular';

export const CLUBS_QUERY = gql`
  query IClubsQuery {
    clubs {
      id
      name
    }
  }
`;
