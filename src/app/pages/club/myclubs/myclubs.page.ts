import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/services/GRAPHQL/club/club.service';
import { Observable } from 'rxjs';
import { IMyClubsListQuery, IMyClubsListQuery_userRoles } from 'src/graphql_interfaces';

@Component({
  selector: 'app-myclubs',
  templateUrl: './myclubs.page.html',
  styleUrls: ['./myclubs.page.scss'],
})
export class MyclubsPage implements OnInit {
  roles$: Observable<IMyClubsListQuery>;

  adminRoles: IMyClubsListQuery['userRoles'] = [];
  instructorRoles: IMyClubsListQuery['userRoles'] = [];
  memberRoles: IMyClubsListQuery['userRoles'] = [];

  constructor(private clubService: ClubService) {}

  ngOnInit() {
    this.getData();
  }

  filterListBy(value: string, role: IMyClubsListQuery_userRoles | null): boolean {
    return role!.userRole == value;
  }

  userSubscription(role: IMyClubsListQuery_userRoles | null): string {
    if (!role) {
      return '';
    }

    const userSubscription = role!.club!.clubsubscription!.find((sub) => {
      return sub!.clubSubscriptionId == role!.clubSubscriptionId;
    });

    if (!userSubscription) {
      return '';
    }

    return userSubscription.name ?? '';
  }

  private getData() {
    this.roles$ = this.clubService.myClubsListDetails();
    this.roles$.subscribe((clubs) => {
      this.adminRoles = clubs!.userRoles!.filter((club) => this.filterListBy('Admin', club));
      this.instructorRoles = clubs!.userRoles!.filter((club) => this.filterListBy('Instructor', club));
      this.memberRoles = clubs!.userRoles!.filter((club) => this.filterListBy('Member', club));
    });
  }
}
