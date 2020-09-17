import { Component, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { IRatesQuery, IRatesQueryVariables, IRatesQuery_rates } from 'src/graphql_interfaces';
import { RATES_QUERY } from './queries';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  rates: IRatesQuery['rates'];
  loading: boolean = true;
  error: ApolloError;

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.apollo
      .watchQuery<IRatesQuery, IRatesQueryVariables>({
        query: RATES_QUERY,
        variables: { currency: 'DKK' },
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.rates = data.rates;
        this.loading = loading;
        this.error = error;
      });
  }
}
