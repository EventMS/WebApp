import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
import { Observable } from 'rxjs';
import {
  IMyEventsQuery,
  IMyEventsQuery_myEventParticipations,
  IMyEventsQuery_myInstructorEvents,
} from 'src/graphql_interfaces';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private today: Date = new Date();
  events$: Observable<IMyEventsQuery>;
  instructorEventsToday: IMyEventsQuery['myInstructorEvents'] = [];
  participantEventsToday: IMyEventsQuery['myEventParticipations'] = [];

  constructor(private eventService: EventService, private loadingController: LoadingController) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    const loading = await this.presentLoading();
    await loading.present();
    this.events$ = this.eventService.getMyEvents();
    this.events$.subscribe(async (data) => {
      await loading.dismiss();
      this.instructorEventsToday = data.myInstructorEvents!.filter((ev) => this.isToday(ev!.startTime));
      this.participantEventsToday = data.myEventParticipations!.filter((ev) => this.isToday(ev!.event!.startTime));
    });
  }

  formatDate(date: string): string {
    const dateObject = new Date(date);
    return dateObject.toLocaleTimeString();
  }

  private isToday(dateString: string): boolean {
    const date = new Date(dateString);
    return date.getDate() == this.today.getDate();
  }

  private presentLoading = async () => {
    return this.loadingController.create({ message: 'Loading events...' });
  };
}
