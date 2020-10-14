import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {}

  loginForm = this.formBuilder.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(strongRegex)])),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit = async () => {
    const { email, password }: FormData = this.loginForm.value;
    this.authenticationService.login({ email: email, password: password });
  };

  ngOnInit() {}
}

type FormData = { email: string; password: string };
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
