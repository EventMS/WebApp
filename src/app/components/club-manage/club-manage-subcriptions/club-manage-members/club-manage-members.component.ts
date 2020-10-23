import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersForClubQueryService } from 'src/app/services/GRAPHQL/member/members-for-club-query.service';
import { Observable } from 'rxjs';
import { IMembersForClubQuery, IMembersForClubQuery_membersForClub, IMembersForClubQuery_membersForClub_user_permissions } from 'src/graphql_interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-club-manage-members',
  templateUrl: './club-manage-members.component.html',
  styleUrls: ['./club-manage-members.component.scss'],
})
export class ClubManageMembersComponent implements OnInit {

  members$: Observable<IMembersForClubQuery>
  private clubId: string

  constructor(private memberQueryService: MembersForClubQueryService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRoute().then(() => {
      this.fetchData();
    })
  }

  async getRoute() {
    this.route.params.subscribe((params) => {
      this.clubId = params['clubId'];
    });
  }

  fetchData() {
    this.members$ = this.memberQueryService.watch({clubId: this.clubId}).valueChanges.pipe(map((value) => value.data));
    this.members$.subscribe(()=> {

    })
  }

  isUserAdmin(permissions: (IMembersForClubQuery_membersForClub_user_permissions | null)[]) {
    return (permissions.find((perm) => {
      return perm.userRole == "Admin"
    }))
  }

  isUserInstructor(permissions: (IMembersForClubQuery_membersForClub_user_permissions | null)[]) {
    return (permissions.find((perm) => {
      return perm.userRole == "Member"
    }))
  }

}
