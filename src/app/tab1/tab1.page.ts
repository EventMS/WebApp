import { Component, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  rates: IRatesQuery['rates'];
  loading = true;
  error: ApolloError;

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.apollo
      .watchQuery<IRatesQuery, IRatesQueryVaribales>({
        query: RATES_QUERY,
        variables: { currency: 'USD' },
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.rates = data.rates;
        this.loading = loading;
        this.error = error;
        console.log(error);
      });
  }
}

interface IRatesQuery {
  currency: string;
  rates: string;
}

interface IRatesQueryVaribales {
  currency: string;
}

const RATES_QUERY = gql`
  query RATES_QUERY($currency: String!) {
    rates(currency: $currency) {
      rate
      currency
    }
  }
`;
