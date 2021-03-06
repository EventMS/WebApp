import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class CreateClubFormBuilder {
  private phoneRegex: string = '[0-9]{8}';
  private regNumberRegex: string = '[0-9]{4}';
  private accountNumberRegex: string = '[0-9]{8}';

  form: FormGroup;

  constructor(private formbuilder: FormBuilder) {
    this.form = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]),
      regNumber: new FormControl('', [Validators.required, Validators.pattern(this.regNumberRegex)]),
      accountNumber: new FormControl('', [Validators.required, Validators.pattern(this.accountNumberRegex)]),
      address: new FormControl('', Validators.required),
      description: new FormControl('', null),
      locations: new FormControl('', null),
      currentLocationInput: new FormControl('', null),
    });
  }

  get currentLocationInput() {
    return this.form.get('currentLocationInput');
  }

  get name() {
    return this.form.get('name');
  }

  get phone() {
    return this.form.get('phone');
  }

  get address() {
    return this.form.get('address');
  }

  get regNumber() {
    return this.form.get('regNumber');
  }

  get accountNumber() {
    return this.form.get('accountNumber');
  }
}
