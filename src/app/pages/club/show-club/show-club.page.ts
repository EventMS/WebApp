import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ShowClubQueryService } from 'src/app/services/GRAPHQL/club/queries/show-club-query.service';
import { IShowClubQuery, IShowClubQuery_clubByID_clubsubscription } from 'src/graphql_interfaces';
import { PaymentModalPage } from '../../payment/payment-modal/payment-modal.page';

@Component({
  selector: 'app-show-club',
  templateUrl: `./show-club.page.html`,
  styleUrls: ['./show-club.page.scss'],
})
export class ShowClubPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private showClubQueryService: ShowClubQueryService,
    private modalController: ModalController
  ) {}

  private clubId: number;
  public club$: Observable<IShowClubQuery>;
  public isMobile = isPlatform('mobile');
  public currentSubscription: IShowClubQuery_clubByID_clubsubscription | null;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      const clubId = params['clubId'] as string;
      if (clubId) {
        this.club$ = this.showClubQueryService?.ShowClubQuery$({ clubByID: clubId });
        this.initData();
      }
    });
  }

  public showModal = async (): Promise<void> => {
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      componentProps: {
        clubId: this.clubId,
      },
    });
    return await modal.present();
  };

  private initData = () => {
    this.club$.subscribe(
      ({ clubByID, currentUser }) => {
        if (clubByID?.clubId && currentUser) {
          this.clubId = clubByID.clubId;
          const subscriptionId = currentUser.permissions?.find((perm) => perm?.clubId === clubByID.clubId)
            ?.clubSubscriptionId;
          this.currentSubscription =
            clubByID.clubsubscription?.find((sub) => sub?.clubSubscriptionId === subscriptionId) ?? null;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
