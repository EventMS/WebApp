import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';

enum SideBarContent {
  club,
  events,
  members,
  instructors,
  subscriptions
}

@Component({
  selector: 'app-club-manage',
  templateUrl: './club-manage.page.html',
  styleUrls: ['./club-manage.page.scss'],
})
export class ClubManagePage implements OnInit {

  sidebarContent: SideBarContent = SideBarContent.subscriptions
  SidebarContent: typeof SideBarContent = SideBarContent
  clubName: string

  constructor(private route: ActivatedRoute,
              private clubQueryService: MyClubsQueryService) {
    this.route.params.subscribe(params => { 
      this.clubName = params['clubName']
    }) 
   }

  ngOnInit() {
  }
}
