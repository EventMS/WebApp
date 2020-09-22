import { Component, OnInit } from '@angular/core';
import { type } from 'os';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor() {}

  register = (formdata: loginFormData) => {};

  ngOnInit() {}
}

interface loginFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
