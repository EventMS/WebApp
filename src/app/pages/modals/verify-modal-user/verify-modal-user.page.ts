import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-modal-user',
  templateUrl: './verify-modal-user.page.html',
  styleUrls: ['./verify-modal-user.page.scss'],
})
export class VerifyModalUserPage implements OnInit {
  @Input() code: string;
  constructor() {}

  ngOnInit() {}
}
