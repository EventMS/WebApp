import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-button',
  templateUrl: './confirmation-button.component.html',
  styleUrls: ['./confirmation-button.component.scss'],
})

export class ConfirmationButtonComponent implements OnInit {
  
  @Input() title: String;
  @Input() delegate: ConfirmationButtonComponentDelegate;

  constructor() { }

  ngOnInit() {}

  buttonClicked() {
    this.delegate.didPressButton();
  }
}

export interface ConfirmationButtonComponentDelegate {
  didPressButton()
}