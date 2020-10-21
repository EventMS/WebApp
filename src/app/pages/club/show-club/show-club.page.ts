import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowClubQueryService } from 'src/app/services/GRAPHQL/club/queries/show-club-query.service';
import { IShowClubQuery } from 'src/graphql_interfaces';
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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const name = params['name'] as string;
      if (name) {
        this.club$ = this.showClubQueryService?.ShowClubQuery$({ clubByNameName: name.replace(/_/g, ' ') });
        this.club$.subscribe(({ clubByName }) => (this.clubId = clubByName?.clubId!));
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
}
