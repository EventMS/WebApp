import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-signup',
  templateUrl: './mobile-signup.component.html',
  styleUrls: ['./mobile-signup.component.scss'],
})
export class MobileSignupComponent implements OnInit {
  @Input() buttonText: string;
  @Input() callback: () => void;

  constructor() {}

  ngOnInit() {}
}
