import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private platform: Platform
  ) {}

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
    console.log('called');
    const { email, password }: FormData = this.loginForm.value;
    this.authenticationService.login(email, password);
/*     this.router.navigate(
    this.platform.is("mobile") ?
    ['tabs'] : ["header"]); */
    this.router.navigate(["/header"])
  };

  ngOnInit() {}
}

type FormData = { email: string; password: string };
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
