import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Paths } from 'src/app/navigation/routes';
import { ClubService } from 'src/app/services/GRAPHQL/club/club.service';
import { IShowClubQuery, IShowClubQuery_clubByID_clubsubscription } from 'src/graphql_interfaces';
import { PaymentModalPage } from '../../modals/payment-modal/payment-modal.page';

@Component({
  selector: 'app-show-club',
  templateUrl: `./show-club.page.html`,
  styleUrls: ['./show-club.page.scss'],
})
export class ShowClubPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private clubService: ClubService,
    private modalController: ModalController,
    private router: Router
  ) {}

  private clubId: string;
  public club$: Observable<IShowClubQuery>;
  public isMobile = isPlatform('mobile');
  public events: IShowClubQuery['eventsForClub'];
  public currentSubscription: IShowClubQuery_clubByID_clubsubscription | null;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const clubId = params['clubId'] as string;
      if (clubId) {
        this.club$ = this.clubService.getClubDetails(clubId);
        this.initData();
      }
    });
  }

  private initData = () => {
    this.club$.subscribe(
      ({ clubByID, currentUser, eventsForClub }) => {
        if (clubByID?.clubId && currentUser) {
          this.clubId = clubByID.clubId;
          const subscriptionId = currentUser.permissions?.find((perm) => perm?.clubId === clubByID.clubId)
            ?.clubSubscriptionId;
          this.currentSubscription =
            clubByID.clubsubscription?.find((sub) => sub?.clubSubscriptionId === subscriptionId) ?? null;
        }

        if (eventsForClub) {
          this.events = eventsForClub;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getEventPrice = (i: number) => {
    const eventPrice = this.events?.[i]?.eventPrices?.find(
      (ep) => ep?.clubSubscriptionId == this.currentSubscription?.clubSubscriptionId
    );
    return eventPrice?.price ?? 'no price for you';
  };

  public goToEvent = (id: string) => {
    this.router.navigate(Paths.event_page.route(id));
  };

  public showModal = async (): Promise<void> => {
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      componentProps: {
        clubId: this.clubId,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.success) {
      window.location.reload();
    }
  };
}
