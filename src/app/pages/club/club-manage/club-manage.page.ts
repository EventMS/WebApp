import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';

enum SideBarContent {
  club,
  events,
  members,
  instructors,
  subscriptions,
}

@Component({
  selector: 'app-club-manage',
  templateUrl: './club-manage.page.html',
  styleUrls: ['./club-manage.page.scss'],
})
export class ClubManagePage implements OnInit {
  sidebarContent: SideBarContent = SideBarContent.events;
  SidebarContent: typeof SideBarContent = SideBarContent;
  clubName: string;

  constructor(private route: ActivatedRoute,
     public platform: Platform) {
    this.route.params.subscribe((params) => {
      this.clubName = params['clubId'];
    });
  }

  ngOnInit() {}
}
