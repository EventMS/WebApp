import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowClubQueryService } from 'src/app/services/GRAPHQL/club/show-club-query.service';
import { IShowClubQuery } from 'src/graphql_interfaces';

@Component({
  selector: 'app-show-club',
  templateUrl: './show-club.page.html',
  styleUrls: ['./show-club.page.scss'],
})
export class ShowClubPage implements OnInit {
  constructor(private route: ActivatedRoute, private showClubQueryService: ShowClubQueryService) {}

  public club$: Observable<IShowClubQuery['club']>;

  ngOnInit() {
    this.initData();
  }

  public initData = () => {
    this.route.params.subscribe((params) => {
      const name = params['name'] as string;
      if (name) {
        this.club$ = this.showClubQueryService
          .fetch({
            name: name.replace(/_/g, ' '),
          })
          .pipe(
            map(({ data }) => {
              return data.club;
            })
          );
      }
    });
  };
}
