import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApolloError } from '@apollo/client/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';
import { CreateUserMutationService } from 'src/app/services/GRAPHQL/createUserMutation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  constructor(
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private createUserMutationService: CreateUserMutationService,
    private authenticationService: AuthenticationService
  ) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Welcome to EMS.',
      duration: 2000,
    });
    toast.present();
  }

  signupForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    birthday: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern(mobileRegex)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(strongRegex)])),
  });

  get name() {
    return this.signupForm.get('name');
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get birthday() {
    return this.signupForm.get('birthday');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit = async () => {
    const { name, email, birthday, phoneNumber, password }: FormData = this.signupForm.value;

    this.createUserMutationService
      .mutate({
        request: { email: email, name: name, password: password, phoneNumber: phoneNumber },
      })
      .subscribe(
        ({ data }) => {
          this.presentToast();
          this.authenticationService.loginFromSignup(data!.createUser);
        },
        (error: ApolloError) => {
          if (error.message.includes('input')) alert('Email is already in use');
          else alert('Something went wrong, try again later');
        }
      );
  };
}

type FormData = { name: string; email: string; phoneNumber: string; birthday: Date; password: string };

const mobileRegex = new RegExp('[0-9]{8}');
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
