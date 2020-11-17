import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './GRAPHQL/user/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRServiceService {
  private connection: signalR.HubConnection;

  constructor(private auth: AuthenticationService) {}

  public clubId: string;

  startConnection = () => {
    this.connection = new signalR.HubConnectionBuilder().withUrl(environment.websocketUrl + 'event').build();
    console.log(this.auth.currentUserValue?.user?.id);

    this.connection
      .start()
      .then(() => console.log('Connection started for clubId: ' + this.clubId))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  stopConnection = () => {
    this.connection
      .stop()
      .then(() => console.log('Connection stopped for clubId: ' + this.clubId))
      .catch((err) => console.log('Error while stopping connection: ' + err));
  };

  addListener(successHandler: socketHandler, failedHandler: socketHandler) {
    this.connection.on(this.clubId + '-EventCreated', (data) => successHandler(data));
    this.connection.on(this.clubId + '-EventCreationFailed', (data) => failedHandler(data));
  }

  addClubSubscriptionListener(successHandler: socketHandler) {
    this.connection.on(this.auth.currentUserValue?.user?.id + '-ClubSignup', (data) => successHandler(data));
  }
}

type socketHandler = (data: any) => any;
