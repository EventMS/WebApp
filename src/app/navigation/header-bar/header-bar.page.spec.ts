import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderBarPage } from './header-bar.page';

describe('HeaderBarPage', () => {
  let component: HeaderBarPage;
  let fixture: ComponentFixture<HeaderBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
