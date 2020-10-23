import { Component, OnInit } from '@angular/core';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.page.html',
  styleUrls: ['./event-page.page.scss'],
})
export class EventPagePage implements OnInit {
  constructor() {}

  public isMobile = isPlatform('mobile');

  ngOnInit() {}
}
