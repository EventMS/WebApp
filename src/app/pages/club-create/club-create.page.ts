import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Button } from 'protractor';
import { CreateClubMutationService } from 'src/app/services/GRAPHQL/create-club-mutation.service';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.page.html',
  styleUrls: ['./club-create.page.scss'],
})
export class ClubCreatePage implements OnInit {

  //constants
  private duplicateError: string = "You can't input duplicate locations"
  private nullError: string = "Location must have a name"

  locations: string[] = [];

  constructor(private formbuilder: FormBuilder,
              private alertCtrl: AlertController,
              private createClubMutationService: CreateClubMutationService) { 
  }

  clubform = this.formbuilder.group({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    locations: new FormControl('', null),
    currentLocationInput: new FormControl('', null)
  });

  ngOnInit() {
  }

  get name() {
    return this.clubform.get('name');
  }

  get description() {
    return this.clubform.get('description');
  }

  get currentLocationInput() {
    return this.clubform.get('currentLocationInput').value
  }

  get formLocations() {
    return this.clubform.get('locations')
  }

  onSubmit = async () => {
    const { name, description, locations }: FormData = this.clubform.value;
    console.log(name, description, locations);

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

    if(this.locations.includes(input)){
      this.presentAlert(this.duplicateError)
      return
    } else if(input === "") {
      this.presentAlert(this.nullError)
      return
    }

    this.locations.push(input)
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

}

type FormData = { name: string; description: string, locations: string[]};