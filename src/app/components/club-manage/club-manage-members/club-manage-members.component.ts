import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import {
  IMembersForClubQuery,
  IMembersForClubQuery_permissionsInClub_user,
  IMembersForClubQuery_permissionsInClub,
} from 'src/graphql_interfaces';
import { AlertController, Platform } from '@ionic/angular';
import { MemberService } from 'src/app/services/GRAPHQL/member/member.service';

@Component({
  selector: 'app-club-manage-members',
  templateUrl: './club-manage-members.component.html',
  styleUrls: ['./club-manage-members.component.scss'],
})
export class ClubManageMembersComponent implements OnInit {
  members$: Observable<IMembersForClubQuery>;
  admin: IMembersForClubQuery_permissionsInClub | null | undefined;
  members: IMembersForClubQuery['permissionsInClub'] = [];
  filteredMembers: IMembersForClubQuery['permissionsInClub'] = [];
  searchQuery: string;

  private clubId: string;

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private memberService: MemberService,
    public platform: Platform
  ) {}

  searchBarChange(event: string) {
    this.filteredMembers = this.members!.filter((permission) => {
      if (permission!.userRole! == 'Admin') {
        return false;
      } else {
        return permission!.user!.name!.toLocaleLowerCase().includes(event.toLocaleLowerCase());
      }
    });
  }

  ngOnInit() {
    this.getRoute().then(() => {
      this.fetchData();
    });
  }

  async getRoute() {
    this.route.params.subscribe((params) => {
      this.clubId = params['clubId'];
    });
  }

  fetchData() {
    this.members$ = this.memberService.getMembers(this.clubId);
    this.members$.subscribe((members) => {
      this.admin = members!.permissionsInClub!.find((member) => {
        return member!.userRole == 'Admin';
      });
      this.members = members.permissionsInClub;
      this.filteredMembers = members.permissionsInClub;
    });
  }

  async onRemoveMember(member: IMembersForClubQuery_permissionsInClub_user) {
    console.log('MEMBER REMOVED');
  }

  async onDemoteInstructor(member: IMembersForClubQuery_permissionsInClub_user) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to demote ' + member.name + ' to member?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.removeInstructor(member);
          },
        },
      ],
    });

    await alert.present();
  }

  async onPromoteInstructor(member: IMembersForClubQuery_permissionsInClub_user) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to promote ' + member.name + ' to instructor?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.promoteInstructor(member);
          },
        },
      ],
    });

    await alert.present();
  }

  promoteInstructor(member: IMembersForClubQuery_permissionsInClub_user) {
    this.memberService.addInstructor(this.clubId, member.id!).subscribe();
  }

  removeInstructor(member: IMembersForClubQuery_permissionsInClub_user) {
    this.memberService.removeInstructor(this.clubId, member.id!).subscribe();
  }

  isUserAdmin(permissions: IMembersForClubQuery_permissionsInClub | null) {
    return permissions!.userRole == 'Admin';
  }

  isUserInstructor(permissions: IMembersForClubQuery_permissionsInClub | null) {
    return permissions!.userRole == 'Instructor';
  }

  isUserMember(permissions: IMembersForClubQuery_permissionsInClub | null) {
    return permissions!.userRole != 'Instructor' && permissions!.userRole != 'Admin';
  }
}
