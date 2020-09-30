import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor() {}
  // clubs: IClubsQuery['clubs'];
  // loading: boolean;
  // private querySubscription: Subscription;
  // constructor(private apollo: Apollo) {}
  // ngOnInit() {
  //   this.querySubscription = this.apollo
  //     .watchQuery<IClubsQuery>({
  //       query: CLUBS_QUERY,
  //     })
  //     .valueChanges.subscribe(({ data, loading }) => {
  //       this.clubs = data.clubs;
  //       this.loading = loading;
  //     });
  // }
  // ngOnDestroy() {
  //   this.querySubscription.unsubscribe();
  // }
}
