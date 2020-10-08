import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClubManagePage } from './club-manage.page';

describe('ClubManagePage', () => {
  let component: ClubManagePage;
  let fixture: ComponentFixture<ClubManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClubManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
