import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';

@Component({
  selector: 'app-verify-modal-user',
  templateUrl: './verify-modal-user.page.html',
  styleUrls: ['./verify-modal-user.page.scss'],
})
export class VerifyModalUserPage implements OnInit {
  @Input() eventId: string;
  @Input() isInstructor: boolean;
  public code: string;

  constructor(private modalController: ModalController, private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getVerificationCodes().subscribe(({ currentUser }) => {
      this.code =
        currentUser?.events?.find((data) => data?.eventId == this.eventId)?.code ??
        'code not generated yet, try again later';
    });
  }

  public onCodeSubmitted = () => {};
}
