import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyModalUserPage } from './verify-modal-user.page';

describe('VerifyModalUserPage', () => {
  let component: VerifyModalUserPage;
  let fixture: ComponentFixture<VerifyModalUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyModalUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyModalUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
