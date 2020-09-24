import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IRatesQuery, IRatesQueryVariables, IRatesQuery_rates } from 'src/graphql_interfaces';
import { RATES_QUERY } from './queries';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  rates: IRatesQuery['rates'];
  loading: boolean;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<IRatesQuery, IRatesQueryVariables>({
        query: RATES_QUERY,
        variables: { currency: 'DKK' },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.rates = data.rates;
        this.loading = loading;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
