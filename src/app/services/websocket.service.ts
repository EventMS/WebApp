import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './GRAPHQL/user/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private connection: signalR.HubConnection;

  constructor(private auth: AuthenticationService) {}

  public clubId: string;

  startConnection = () => {
    this.connection = new signalR.HubConnectionBuilder().withUrl(environment.websocketUrl + 'event').build();

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

  addClubSubscriptionListener(successHandler: socketHandler, failedHandler?: socketHandler) {
    this.connection.on(this.auth.currentUserValue?.user?.id + '-ClubSignup', (data) => successHandler(data));
    this.connection.on(this.auth.currentUserValue?.user?.id + '-ClubSignupFailed', (data) => failedHandler?.(data));
  }
}

type socketHandler = (data: any) => any;
