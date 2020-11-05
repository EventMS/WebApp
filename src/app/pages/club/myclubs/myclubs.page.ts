import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/services/GRAPHQL/club/club.service';
import { Observable } from 'rxjs'
import { IMyClubsListQuery, IMyClubsListQuery_currentUser_permissions, IMyClubsListQuery_myClubs, IMyClubsListQuery_myClubs_clubsubscription } from 'src/graphql_interfaces';

@Component({
  selector: 'app-myclubs',
  templateUrl: './myclubs.page.html',
  styleUrls: ['./myclubs.page.scss'],
})
export class MyclubsPage implements OnInit {
  clubs$: Observable<IMyClubsListQuery>

  adminClubs: IMyClubsListQuery["myClubs"] = []
  instructorClubs: IMyClubsListQuery["myClubs"] = []
  memberClubs: IMyClubsListQuery["myClubs"] = []

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.getData()
  }

  filterListBy(value: string, clubs: IMyClubsListQuery, club: IMyClubsListQuery_myClubs | null): boolean {
    const permissionsForClub = clubs!.currentUser!.permissions!.find((perm) => {
      return perm!.clubId == club!.clubId
    })

    return permissionsForClub!.userRole == value
  }

  userSubscription(club: IMyClubsListQuery_myClubs, permissions: IMyClubsListQuery_currentUser_permissions[]): string {
    if(!permissions) {return ""}

    const permissionsForClub = permissions.find((perm) => {
      return perm.clubId == club.clubId
    })

    if(permissionsForClub!.userRole == "Member"){return "Your subscription: " + permissionsForClub!.clubSubscription!.name}
    else { return ""}
  }

  private getData() {
    this.clubs$ = this.clubService.myClubsListDetails()
    this.clubs$.subscribe((clubs) => {
      this.adminClubs = clubs!.myClubs!.filter((club) => this.filterListBy("Admin", clubs, club))
      this.instructorClubs = clubs!.myClubs!.filter((club) => this.filterListBy("Instructor", clubs, club))
      this.instructorClubs = clubs!.myClubs!.filter((club) => this.filterListBy("Member", clubs, club))
    })
  }
}
