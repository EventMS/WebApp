import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersForClubQueryService } from 'src/app/services/GRAPHQL/member/members-for-club-query.service';
import { Observable } from 'rxjs';
import { IMembersForClubQuery, IMembersForClubQuery_membersForClub_user, IMembersForClubQuery_membersForClub_user_permissions } from 'src/graphql_interfaces';
import { map } from 'rxjs/operators';
import { AddInstructorMutationService } from 'src/app/services/GRAPHQL/instructors/mutations/add-instructor-mutation.service';
import { RemoveInstructorMutationService } from 'src/app/services/GRAPHQL/instructors/mutations/remove-instructor-mutation.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-club-manage-members',
  templateUrl: './club-manage-members.component.html',
  styleUrls: ['./club-manage-members.component.scss'],
})
export class ClubManageMembersComponent implements OnInit {

  members$: Observable<IMembersForClubQuery>
  private clubId: string

  constructor(private memberQueryService: MembersForClubQueryService,
    private route: ActivatedRoute,
    private addInstructorMutationService: AddInstructorMutationService,
    private removeInstructorMutationService: RemoveInstructorMutationService,
    private alertCtrl: AlertController) { }

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
  }

  async onRemoveMember(member: IMembersForClubQuery_membersForClub_user) {
    console.log("MEMBER REMOVED")
  }
  
  async onDemoteInstructor(member: IMembersForClubQuery_membersForClub_user) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to demote '+ member.name + ' to member?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Confirm',
          handler: () => {
            this.removeInstructor(member)
          }
        }
      ]
    });

    await alert.present();
  }

  async onPromoteInstructor(member: IMembersForClubQuery_membersForClub_user) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to promote '+ member.name + ' to instructor?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Confirm',
          handler: () => {
            this.promoteInstructor(member)
          }
        }
      ]
    });

    await alert.present();
  }

  promoteInstructor(member: IMembersForClubQuery_membersForClub_user) {
    this.addInstructorMutationService
    .mutate({clubId: this.clubId, instructorId: member.id},  {
      refetchQueries: [
        {
          query: this.memberQueryService.document,
          variables: { clubId: this.clubId },
        },
      ]
    })
    .subscribe()
  }

  removeInstructor(member: IMembersForClubQuery_membersForClub_user) {
    this.removeInstructorMutationService
    .mutate({clubId: this.clubId, instructorId: member.id}, {
      refetchQueries: [
        {
          query: this.memberQueryService.document,
          variables: { clubId: this.clubId },
        },
      ]
    })
    .subscribe()
  }

  isUserAdmin(permissions: (IMembersForClubQuery_membersForClub_user_permissions | null)[]) {
    return (permissions.find((perm) => {
      return perm!.userRole == "Admin"
    }))
  }

  isUserInstructor(permissions: (IMembersForClubQuery_membersForClub_user_permissions | null)[]) {
    return (permissions.find((perm) => {
      return perm!.userRole == "Instructor"
    }))
  }

  isUserMember(permissions: (IMembersForClubQuery_membersForClub_user_permissions | null)[]) {
    return (permissions.find((perm) => {
      return perm!.userRole != "Instructor" && perm!.userRole != "Admin"
    }))
  }

}
