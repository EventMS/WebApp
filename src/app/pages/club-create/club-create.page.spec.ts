import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClubCreatePage } from './club-create.page';

describe('ClubCreatePage', () => {
  let component: ClubCreatePage;
  let fixture: ComponentFixture<ClubCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClubCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
