import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClubManageSubcriptionsComponent } from './club-manage-subcriptions.component';

describe('ClubManageSubcriptionsComponent', () => {
  let component: ClubManageSubcriptionsComponent;
  let fixture: ComponentFixture<ClubManageSubcriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubManageSubcriptionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClubManageSubcriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
