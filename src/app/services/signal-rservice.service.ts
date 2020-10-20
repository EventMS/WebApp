import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {

  private connection: signalR.HubConnection

  startConnection = () => {
    this.connection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:5102/')
                            .build();
    this.connection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  addListener(handler: socketHandler) {
    this.connection.on('websocketTest', (data) => handler(data))
  }

  constructor() { }
}

type socketHandler = (data: any) => any
