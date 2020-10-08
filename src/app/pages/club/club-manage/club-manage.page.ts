import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';

@Component({
  selector: 'app-club-manage',
  templateUrl: './club-manage.page.html',
  styleUrls: ['./club-manage.page.scss'],
})
export class ClubManagePage implements OnInit {

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
