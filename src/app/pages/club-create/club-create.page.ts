import { Component, OnInit } from '@angular/core';
import { ConfirmationButtonComponentDelegate } from 'src/app/components/confirmation-button/confirmation-button.component';
import { CreateClubMutationService } from 'src/app/services/GRAPHQL/create-club-mutation.service';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.page.html',
  styleUrls: ['./club-create.page.scss'],
})
export class ClubCreatePage implements OnInit, ConfirmationButtonComponentDelegate {
  constructor(private createClubService: CreateClubMutationService) {}

  didPressButton() {
    console.log('Submit clicked');
    this.createClubService.createClub({ name: 'Something' }).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  private handleResponse(data) {
    console.log('Kunne oprette klub');
    console.log(data);
  }

  private handleError(error) {
    console.log('Kunne ikke oprette klub');
    console.log(error);
  }

  ngOnInit() {}
}
