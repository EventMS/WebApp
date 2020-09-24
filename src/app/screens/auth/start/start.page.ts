import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  gifURL = 'https://media1.tenor.com/images/4324d537dbc06f422b34ae131c7b3e14/tenor.gif?itemid=7755460';

  constructor() {}

  ngOnInit() {}
}
