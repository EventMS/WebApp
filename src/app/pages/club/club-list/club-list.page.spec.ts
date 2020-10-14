import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ClubListPage } from './club-list.page';

fdescribe('ClubListPage', () => {
  let component: ClubListPage;
  let fixture: ComponentFixture<ClubListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubListPage],
      imports: [IonicModule.forRoot(), FormsModule, ApolloTestingModule.withClients([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
