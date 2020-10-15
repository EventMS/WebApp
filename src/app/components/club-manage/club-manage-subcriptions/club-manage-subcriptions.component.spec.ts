import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClubSubscriptionsQueryService } from 'src/app/services/GRAPHQL/subscriptions/queries/club-subscriptions-query.service';
import { ClubManageSubcriptionsComponent } from './club-manage-subcriptions.component';

describe('ClubManageSubcriptionsComponent', () => {
  let component: ClubManageSubcriptionsComponent;
  let fixture: ComponentFixture<ClubManageSubcriptionsComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {

    //mockService = jasmine.createSpyObj('ClubSubscriptionsQueryService', ['watch'])

    TestBed.configureTestingModule({
      declarations: [ ClubManageSubcriptionsComponent ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubManageSubcriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

});
