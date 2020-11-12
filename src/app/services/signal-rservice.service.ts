import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRServiceService {
  private connection: signalR.HubConnection;

  clubId: string;

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
    .then(() => console.log("Connection stopped for clubId: " + this.clubId))
    .catch((err) => console.log('Error while stopping connection: ' + err));
  }

  addListener(successHandler: socketHandler, failedHandler: socketHandler) {
    this.connection.on(this.clubId + '-EventCreated', (data) => successHandler(data));
    this.connection.on(this.clubId + '-EventCreationFailed', (data) => failedHandler(data));
  }
}

type socketHandler = (data: any) => any;
