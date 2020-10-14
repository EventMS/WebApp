import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CreateSubscriptionMutationService } from 'src/app/services/GRAPHQL/subscriptions/mutations/create-subscription-mutation.service';
import { ClubSubscriptionsQueryService } from 'src/app/services/GRAPHQL/subscriptions/queries/club-subscriptions-query.service';
import { ISubscriptionsForClubQuery } from 'src/graphql_interfaces';
import { CreateSubscriptionFormBuilder } from './subscription-formbuilder';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-club-manage-subcriptions',
  templateUrl: './club-manage-subcriptions.component.html',
  styleUrls: ['./club-manage-subcriptions.component.scss'],
})
export class ClubManageSubcriptionsComponent implements OnInit {
  private subscriptionForm: CreateSubscriptionFormBuilder;
  private clubId: string;
  
  clubSubscriptions$: Observable<ISubscriptionsForClubQuery["subscriptionsForClub"]>;
  clubSubscriptions: ISubscriptionsForClubQuery["subscriptionsForClub"] = [];

  constructor(private clubSubscriptionsService: ClubSubscriptionsQueryService,
              formBuilder: FormBuilder,
              private createSubscriptionService: CreateSubscriptionMutationService,
              private route: ActivatedRoute,
              private alertCtrl: AlertController) {
    this.subscriptionForm = new CreateSubscriptionFormBuilder(formBuilder);
    this.route.params.subscribe((params) => {
      this.clubId = params['clubId'];
    });
  }

  ngOnInit() {
    this.clubSubscriptions$ = this.clubSubscriptionsService.watch({clubId: this.clubId}).valueChanges.pipe(map(result => result.data.subscriptionsForClub))
    this.clubSubscriptions$.subscribe(
      (data) => {
      this.clubSubscriptions = data;
      this.form.reset()
    })
  }
  
  get form() {
    return this.subscriptionForm.form;
  }

  get name() {
    return this.subscriptionForm.name;
  }

  get price() {
    return this.subscriptionForm.price;
  }

  get subscriptionReference() {
    return this.subscriptionForm.subscriptionReference;
  }

  onSubmit() {
    const formData: FormData = this.form.value

    this.createSubscriptionService.mutate({
      request: {
        clubId: this.clubId,
        name: formData.name,
        price: formData.price,
        referenceId: formData.subscriptionReference
      }
    },{
      refetchQueries: [{
        query: this.clubSubscriptionsService.document,
        variables: { clubId: this.clubId }
      }],
      awaitRefetchQueries: true,
    }).subscribe( 
      () => {},
      (error) => {
        console.log(error)
        this.presentAlert()
    })
  }

  private async presentAlert() {
    const alert = this.alertCtrl.create({
      header: 'Error',
      message: 'Could not create subscription, it may already exist',
      buttons: ['OK'],
    });

    (await alert).present();
  }
}

type FormData = {
  name: string;
  price: number;
  subscriptionReference: any;
};
