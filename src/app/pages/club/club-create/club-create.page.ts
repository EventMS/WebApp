import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CreateClubMutationService } from 'src/app/services/GRAPHQL/create-club-mutation.service';
import { CreateClubRequestInput } from 'src/graphql_interfaces';
import { CreateClubFormBuilder } from './club-create-formbuilder';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.page.html',
  styleUrls: ['./club-create.page.scss'],
})

export class ClubCreatePage implements OnInit {

  private createClubFormBuilder: CreateClubFormBuilder;

  locations: string[] = [];

  constructor(private formbuilder: FormBuilder,
              private alertCtrl: AlertController,
              private createClubService: CreateClubMutationService,
              private router: Router) { 
      this.createClubFormBuilder = new CreateClubFormBuilder(formbuilder)
  }

  ngOnInit() {
  }

  get clubform() {
    return this.createClubFormBuilder.form;
  }

  get currentLocationInput() {
    return this.clubform.get('currentLocationInput')
  }

  onSubmit = async () => {
    const { name, phone, address, regNumber, accountNumber, description, locations }: FormData = this.clubform.value;
    console.log( name, phone, address, regNumber, accountNumber, description, locations)

    this.createClubService.createClub({ name: name, description: description, phoneNumber: phone, accountNumber: accountNumber, registrationNumber: regNumber, address: address, locations: locations }).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  async presentAlert(msg: string) {
    const alert = this.alertCtrl.create({
      header: "Error",
      message: msg,
      buttons: ['OK']
    });

    (await alert).present()
  }

  didAddLocationItem() {
    let input = this.currentLocationInput

    if(this.locations.includes(input.value)){
      this.presentAlert(ErrorMessages.duplicate)
      return
    } else if(input.value === "") {
      this.presentAlert(ErrorMessages.noName)
      return
    }

    this.locations.push(input.value)
    this.clubform.patchValue({
      locations: this.locations
    });
    this.clubform.patchValue({
      currentLocationInput: ""
    });
  }

  didRemoveLocationItem(location: string) {
    this.locations = this.locations.filter( otherLocation => {
      return location != otherLocation;
    });
  }

  private handleResponse(data) {
    //Navigate to page for new created club
    this.router.navigate(['/tabs/club-details'])
  }

  private async handleError(error) {

    console.log(error)
    const alert = this.alertCtrl.create({
      header: "Error",
      message: error,
      buttons: ['OK']
    });

    (await alert).present()
  }
}

enum ErrorMessages {
  duplicate = "You can't input duplicate locations",
  noName = "Location must have a name"
}

type FormData = { name: string,
                  description: string,
                  regNumber: string,
                  accountNumber: string,
                  address: string,
                  phone: string,
                  locations: string[]};

                  