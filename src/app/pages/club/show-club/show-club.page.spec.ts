import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowClubPage } from './show-club.page';

describe('ShowClubPage', () => {
  let component: ShowClubPage;
  let fixture: ComponentFixture<ShowClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowClubPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
