import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateEventClubQueryService } from 'src/app/services/GRAPHQL/club/queries/create-event-club-query.service';
import { EventCreateComponent } from './event-create/event-create.component';

@Component({
  selector: 'app-club-manage-events',
  templateUrl: './club-manage-events.component.html',
  styleUrls: ['./club-manage-events.component.scss'],
})
export class ClubManageEventsComponent implements OnInit {

  private clubId: string

  constructor(private modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clubQueryService: CreateEventClubQueryService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.clubId = params['clubId'];
    });
  }

  async onCreateClicked() {
    this.router.navigate(['event-create', this.clubId])
    /* const modal = await this.modalController.create({
      component: EventCreateComponent,
      cssClass: 'modal-popup'
    });

    return await modal.present(); */
  }
}
