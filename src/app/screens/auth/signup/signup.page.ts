import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreateUserMutationService } from 'src/app/services/GRAPHQL/createUserMutation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  constructor(private formBuilder: FormBuilder, private createUserMutationService: CreateUserMutationService) {}

  signupForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    birthday: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(strongRegex)])),
  });

  get name() {
    return this.signupForm.get('name');
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
    const { name, email, birthday, password }: FormData = this.signupForm.value;

    this.createUserMutationService
      .mutate({
        request: { email: email, name: name, password: password, phoneNumber: '71782781' },
      })
      .subscribe(({ data, errors }) => {
        if (errors) console.log(errors);
        console.log('got data', data?.createUser);
      });
  };
}

type FormData = { name: string; email: string; birthday: string; password: string };

const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
