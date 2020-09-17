import { gql } from 'apollo-angular';

export const RATES_QUERY = gql`
  query IRatesQuery($currency: String!) {
    rates(currency: $currency) {
      rate
      currency
    }
  }
`;
