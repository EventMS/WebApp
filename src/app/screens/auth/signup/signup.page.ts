import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ICreateUser, ICreateUserVariables } from 'src/graphql_interfaces';
import { CREATE_USER_MUTATION } from './mutations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {}

  signupForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    mobile: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^\\d{8}$')])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(strongRegex)])),
  });

  onSubmit = (formdata: any) => {
    const { email, name, password, phoneNumber } = formdata.form.value;
    this.apollo
      .mutate<ICreateUser, ICreateUserVariables>({
        mutation: CREATE_USER_MUTATION,
        variables: {
          request: {
            email: email,
            name: name,
            password: password,
            phoneNumber: phoneNumber,
          },
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  };
}

const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
