import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClubSubscriptionsQueryService } from 'src/app/services/GRAPHQL/subscriptions/queries/club-subscriptions-query.service';
import { ClubSubscriptionMockService } from 'src/app/services/Mocks/club-subscription-mock.service';
import { ClubManageSubcriptionsComponent } from './club-manage-subcriptions.component';

describe('ClubManageSubcriptionsComponent', () => {
  let component: ClubManageSubcriptionsComponent;
  let fixture: ComponentFixture<ClubManageSubcriptionsComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let mockService;

  beforeEach(async(() => {

    //mockService = jasmine.createSpyObj('ClubSubscriptionsQueryService', ['watch'])

    TestBed.configureTestingModule({
      declarations: [ ClubManageSubcriptionsComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
      providers: [{provide: ClubSubscriptionsQueryService, useValue: jasmine.createSpyObj('ClubSubscriptionsQueryService',['watch'])}]
    }).compileComponents();

    fixture = TestBed.createComponent(ClubManageSubcriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

/*   it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Validation testing
  it('form should be invalid upon creation', () => {
    expect(component.form.valid).toBeFalsy();
  })

  //Required stuff
  it('form should be invalid when NAME empty', () => {
    component.form.controls['name'].setValue("");
    component.form.controls['phone'].setValue("12345678");
    expect(component.form.valid).toBeFalsy();
  }) */

});
