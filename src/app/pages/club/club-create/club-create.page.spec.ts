import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClubCreatePage } from './club-create.page';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CreateClubMutationService } from 'src/app/services/GRAPHQL/club/mutations/create-club-mutation.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClubServiceMockService } from 'src/app/services/Mocks/club-service-mock.service';

describe('ClubCreatePage', () => {
  let component: ClubCreatePage;
  let fixture: ComponentFixture<ClubCreatePage>;
  let de: DebugElement;
  let el: HTMLElement;

  let mockService = new ClubServiceMockService();

  let emptyInput = '';
  let nonEmptyInput = 'Test Tester';

  //Valid test values
  let validPhone = '83828382';
  let validRegNumber = '1234';
  let validAccountNumber = '12345678';

  //Invalid test values
  let invalidPhone = '8382838';
  let invalidRegNumber = '123';
  let invalidAccountNumber = '1234567';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubCreatePage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, AppRoutingModule],
      providers: [{ provide: CreateClubMutationService, useValue: mockService }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ClubCreatePage);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Validation testing
  it('form should be invalid upon creation', () => {
    expect(component.clubform.valid).toBeFalsy();
  });

  //Required stuff
  it('form should be invalid when NAME empty', () => {
    component.clubform.controls['name'].setValue(emptyInput);
    component.clubform.controls['phone'].setValue(validPhone);
    component.clubform.controls['regNumber'].setValue(validRegNumber);
    component.clubform.controls['accountNumber'].setValue(validAccountNumber);
    component.clubform.controls['address'].setValue(nonEmptyInput);
    expect(component.clubform.valid).toBeFalsy();
  });

  it('form should be invalid when PHONE empty', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(emptyInput);
    component.clubform.controls['regNumber'].setValue(validRegNumber);
    component.clubform.controls['accountNumber'].setValue(validAccountNumber);
    component.clubform.controls['address'].setValue(nonEmptyInput);
    expect(component.clubform.valid).toBeFalsy();
  });

  it('form should be invalid when REGNUMBER empty', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(validPhone);
    component.clubform.controls['regNumber'].setValue(emptyInput);
    component.clubform.controls['accountNumber'].setValue(validAccountNumber);
    component.clubform.controls['address'].setValue(nonEmptyInput);
    expect(component.clubform.valid).toBeFalsy();
  });

  it('form should be invalid when ACCOUNTNUMBER empty', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(validPhone);
    component.clubform.controls['regNumber'].setValue(validRegNumber);
    component.clubform.controls['accountNumber'].setValue(emptyInput);
    component.clubform.controls['address'].setValue(nonEmptyInput);
    expect(component.clubform.valid).toBeFalsy();
  });

  it('form should be invalid when ADDRESS empty', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(validPhone);
    component.clubform.controls['regNumber'].setValue(validRegNumber);
    component.clubform.controls['accountNumber'].setValue(validAccountNumber);
    component.clubform.controls['address'].setValue(emptyInput);
    expect(component.clubform.valid).toBeFalsy();
  });

  //Patterns
  it('form should be invalid when PHONE wrong pattern', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(invalidPhone);
    component.clubform.controls['regNumber'].setValue(validRegNumber);
    component.clubform.controls['accountNumber'].setValue(validAccountNumber);
    component.clubform.controls['address'].setValue(nonEmptyInput);
    expect(component.clubform.valid).toBeFalsy();
  });

  it('form should be invalid when REGNUMBER wrong pattern', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(validPhone);
    component.clubform.controls['regNumber'].setValue(invalidRegNumber);
    component.clubform.controls['accountNumber'].setValue(validAccountNumber);
    component.clubform.controls['address'].setValue(nonEmptyInput);
    expect(component.clubform.valid).toBeFalsy();
  });

  it('form should be invalid when ACCOUNTNUMBER wrong pattern', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(validPhone);
    component.clubform.controls['regNumber'].setValue(validRegNumber);
    component.clubform.controls['accountNumber'].setValue(invalidAccountNumber);
    component.clubform.controls['address'].setValue(nonEmptyInput);
    expect(component.clubform.valid).toBeFalsy();
  });

  // Valid form
  it('form should be valid when inputs are valid', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(validPhone);
    component.clubform.controls['regNumber'].setValue(validRegNumber);
    component.clubform.controls['accountNumber'].setValue(validAccountNumber);
    component.clubform.controls['address'].setValue(nonEmptyInput);
    expect(component.clubform.valid).toBeTruthy();
  });

  it('submit button should NOT be active, when form is invalid', () => {
    fixture.detectChanges();
    let debugEl: DebugElement = fixture.debugElement.query(By.css('#submit'));
    expect(debugEl.nativeElement.disabled).toBeTrue();
  });

  it('submit button should be active, when form is valid', () => {
    component.clubform.controls['name'].setValue(nonEmptyInput);
    component.clubform.controls['phone'].setValue(validPhone);
    component.clubform.controls['regNumber'].setValue(validRegNumber);
    component.clubform.controls['accountNumber'].setValue(validAccountNumber);
    component.clubform.controls['address'].setValue(nonEmptyInput);

    fixture.detectChanges();

    let debugEl: DebugElement = fixture.debugElement.query(By.css('#submit'));

    expect(debugEl.nativeElement.disabled).toBeFalse();
    expect(debugEl.nativeElement.disabled).toEqual(component.clubform.invalid);
  });

  //onSubmit method

  it('should not navigate, if error is returned', fakeAsync(
    inject([Router], (router: Router) => {
      spyOn(router, 'navigate').and.stub();
      spyOn(mockService, 'mutate').and.returnValue(
        new Observable((subscribe) => {
          subscribe.next('data');
        })
      );

      component.onSubmit();

      fixture.detectChanges();

      expect(mockService.mutate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledTimes(1);
    })
  ));

  it('should navigate, if success is returned', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    spyOn(mockService, 'mutate').and.returnValue(
      new Observable((subscribe) => {
        subscribe.error('error');
      })
    );

    component.onSubmit();

    fixture.detectChanges();

    expect(mockService.mutate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(0);
  }));

  //didAddLocationItem

  it('should add a location, if the location is non-empty and is unique', () => {
    component.clubform.controls['currentLocationInput'].setValue(nonEmptyInput);

    fixture.detectChanges();

    component.didAddLocationItem();

    expect(component.locations.includes(nonEmptyInput)).toBeTrue();
    expect(component.clubform.controls['locations'].value.includes(nonEmptyInput)).toBeTrue();
    expect(component.clubform.controls['currentLocationInput'].value === '').toBeTrue();
  });

  it('should not add a location, if the location is empty', () => {
    component.clubform.controls['currentLocationInput'].setValue(emptyInput);

    fixture.detectChanges();

    component.didAddLocationItem();

    expect(component.locations.length == 0).toBeTrue();
    expect(component.clubform.controls['locations'].value.length == 0).toBeTrue();
    expect(component.clubform.controls['currentLocationInput'].value === '').toBeTrue();
  });

  it('should not add a location, if the location is not unique', () => {
    component.clubform.controls['currentLocationInput'].setValue(nonEmptyInput);

    fixture.detectChanges();

    component.didAddLocationItem();

    expect(component.locations.length == 1).toBeTrue();

    component.clubform.controls['currentLocationInput'].setValue(nonEmptyInput);

    fixture.detectChanges();

    component.didAddLocationItem();

    expect(component.locations.length == 1).toBeTrue();
  });

  //didRemoveLocationItem

  it('should remove location, if it has been added', () => {
    component.locations.push(nonEmptyInput);

    expect(component.locations.length == 1).toBeTrue();

    component.didRemoveLocationItem(nonEmptyInput);

    expect(component.locations.length == 0).toBeTrue();
  });

  it('should not remove anything, if the value has not been added', () => {
    component.locations.push(nonEmptyInput);

    expect(component.locations.length == 1).toBeTrue();

    component.didRemoveLocationItem('Some other input');

    expect(component.locations.length == 1).toBeTrue();
  });
});
