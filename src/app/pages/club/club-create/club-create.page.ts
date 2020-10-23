import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Paths } from 'src/app/navigation/routes';
import { CreateClubMutationService } from 'src/app/services/GRAPHQL/club/mutations/create-club-mutation.service';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';
import { CreateClubFormBuilder } from './club-create-formbuilder';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.page.html',
  styleUrls: ['./club-create.page.scss'],
})
export class ClubCreatePage implements OnInit {
  // Private properties
  private createClubFormBuilder: CreateClubFormBuilder;

  // Public properties

  locations: string[] = [];

  // Lifecycle

  constructor(
    private formbuilder: FormBuilder,
    private alertCtrl: AlertController,
    private createClubService: CreateClubMutationService,
    private router: Router,
    private myClubsQueryService: MyClubsQueryService
  ) {
    this.createClubFormBuilder = new CreateClubFormBuilder(formbuilder);
  }

  ngOnInit() {}

  // Getters

  get clubform() {
    return this.createClubFormBuilder.form;
  }

  get name() {
    return this.createClubFormBuilder.name;
  }

  get phone() {
    return this.createClubFormBuilder.phone;
  }

  get address() {
    return this.createClubFormBuilder.address;
  }

  get regNumber() {
    return this.createClubFormBuilder.regNumber;
  }

  get accountNumber() {
    return this.createClubFormBuilder.accountNumber;
  }

  get currentLocationInput() {
    return this.createClubFormBuilder.currentLocationInput;
  }

  // Public methods

  onSubmit = async () => {
    const formData: FormData = this.clubform.value;

    this.createClubService
      .mutate(
        {
          request: {
            name: formData.name,
            description: formData.description,
            phoneNumber: formData.phone.toString(),
            accountNumber: formData.accountNumber.toString(),
            registrationNumber: formData.regNumber.toString(),
            address: formData.address,
            locations: this.locations,
          },
        },
        { refetchQueries: [{ query: this.myClubsQueryService.document }] }
      )
      .subscribe(
        (data) => this.handleResponse(data),
        (error) => this.presentAlert(error)
      );
  };

  didAddLocationItem() {
    let input = this.currentLocationInput!;

    if (this.locations.includes(input.value)) {
      this.presentAlert(ErrorMessages.duplicate);
      return;
    } else if (input.value === '') {
      this.presentAlert(ErrorMessages.noName);
      return;
    }

    this.locations.push(input.value);
    this.clubform.patchValue({
      locations: this.locations,
    });
    this.clubform.patchValue({
      currentLocationInput: '',
    });
  }

  didRemoveLocationItem(location: string) {
    this.locations = this.locations.filter((otherLocation) => {
      return location != otherLocation;
    });

    this.clubform.patchValue({
      locations: this.locations,
    });
  }

  // Private methods

  private async presentAlert(msg: string) {
    const alert = this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK'],
    });

    (await alert).present();
  }

  private handleResponse(data) {
    this.clubform.reset();
    //Navigate to page for new created club
    this.router.navigate([Paths.club_details]);
  }
}

enum ErrorMessages {
  duplicate = "You can't input duplicate locations",
  noName = 'Location must have a name',
}

type FormData = {
  name: string;
  description: string;
  regNumber: Number;
  accountNumber: Number;
  address: string;
  phone: Number;
  locations: string[];
};
