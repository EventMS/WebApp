import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventPaymentModalPage } from './event-payment-modal.page';

describe('EventPaymentModalPage', () => {
  let component: EventPaymentModalPage;
  let fixture: ComponentFixture<EventPaymentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPaymentModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventPaymentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
