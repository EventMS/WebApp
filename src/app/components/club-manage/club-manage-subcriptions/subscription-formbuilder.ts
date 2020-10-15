import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

export class CreateSubscriptionFormBuilder {
  form: FormGroup;

  constructor(private formbuilder: FormBuilder) {
    this.form = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      subscriptionReference: new FormControl('', null),
    });
  }

  get name() {
    return this.form.get('name');
  }

  get price() {
    return this.form.get('price');
  }

  get subscriptionReference() {
    return this.form.get('subscriptionReference');
  }
}
