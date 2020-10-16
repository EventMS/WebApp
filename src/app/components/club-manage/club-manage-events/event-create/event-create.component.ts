import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit {

  form: FormGroup;

  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
        name: new FormControl('', Validators.required),
        locations: new FormControl('', Validators.required),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        instructors: new FormControl('', null),
        description: new FormControl('', null),
      });
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss()
  }

  onSubmit() {

  }
}
