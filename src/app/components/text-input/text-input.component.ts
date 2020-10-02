import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {

  value: String
  @Input() placeholderValue: String;

  constructor() { }

  ngOnInit() {}
}
