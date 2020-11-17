import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-signup-component',
  templateUrl: './mobile-signup.component.html',
  styleUrls: ['./mobile-signup.component.scss'],
})
export class MobileSignupComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;
  @Input() disabled: boolean;
  @Input() callback: () => void;

  constructor() {}

  ngOnInit() {}
}
