import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SignupPage } from './signup.page';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  let de: DebugElement;
  let el: HTMLElement;
  const emptyInput = '';
  const invalidEmail = 'test';
  const validEmail = 'test@test.dk';
  const invalidPassword = '12345';
  const validPassword = 'Pcm27wbi!';
  const validPhoneNumber = '71780508';
  const invalidPhoneNumber = '123';
  const validName = 'Hejsa';
  const invalidName = emptyInput;
  const validBirthday = new Date();
  const invalidBirthday = emptyInput;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, AppRoutingModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SignupPage);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid upon creation', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form should be invalid with invalid EMAIL', () => {
    component.signupForm.controls['name'].setValue(validName);
    component.signupForm.controls['email'].setValue(invalidEmail);
    component.signupForm.controls['phoneNumber'].setValue(validPhoneNumber);
    component.signupForm.controls['birthday'].setValue(validBirthday);
    component.signupForm.controls['password'].setValue(validPassword);
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form should be invalid with invalid NAME', () => {
    component.signupForm.controls['name'].setValue(invalidName);
    component.signupForm.controls['email'].setValue(validEmail);
    component.signupForm.controls['phoneNumber'].setValue(validPhoneNumber);
    component.signupForm.controls['birthday'].setValue(validBirthday);
    component.signupForm.controls['password'].setValue(validPassword);
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form should be invalid with invalid PHONENUMBER', () => {
    component.signupForm.controls['name'].setValue(validName);
    component.signupForm.controls['email'].setValue(validEmail);
    component.signupForm.controls['phoneNumber'].setValue(invalidPhoneNumber);
    component.signupForm.controls['birthday'].setValue(validBirthday);
    component.signupForm.controls['password'].setValue(validPassword);
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form should be invalid with invalid BIRTHDAY', () => {
    component.signupForm.controls['name'].setValue(validName);
    component.signupForm.controls['email'].setValue(validEmail);
    component.signupForm.controls['phoneNumber'].setValue(validPhoneNumber);
    component.signupForm.controls['birthday'].setValue(invalidBirthday);
    component.signupForm.controls['password'].setValue(validPassword);
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form should be invalid with invalid PASSWORD', () => {
    component.signupForm.controls['name'].setValue(validName);
    component.signupForm.controls['email'].setValue(validEmail);
    component.signupForm.controls['phoneNumber'].setValue(validPhoneNumber);
    component.signupForm.controls['birthday'].setValue(validBirthday);
    component.signupForm.controls['password'].setValue(invalidPassword);
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('submit button should NOT be active, when form is invalid', () => {
    fixture.detectChanges();
    let debugEl: DebugElement = fixture.debugElement.query(By.css('#submit'));
    expect(debugEl.nativeElement.disabled).toBeTrue();
  });

  it('submit button should be active, when form is valid', () => {
    component.signupForm.controls['name'].setValue(validName);
    component.signupForm.controls['email'].setValue(validEmail);
    component.signupForm.controls['phoneNumber'].setValue(validPhoneNumber);
    component.signupForm.controls['birthday'].setValue(validBirthday);
    component.signupForm.controls['password'].setValue(validPassword);
    fixture.detectChanges();

    let debugEl: DebugElement = fixture.debugElement.query(By.css('#submit'));

    expect(debugEl.nativeElement.disabled).toBeFalse();
    expect(debugEl.nativeElement.disabled).toEqual(component.signupForm.invalid);
  });

  it('calls onSubmit when button is pressed', () => {
    spyOn(component, 'onSubmit');
    component.signupForm.controls['password'].setValue(validPassword);
    component.signupForm.controls['email'].setValue(validEmail);
    fixture.detectChanges();

    let btn = fixture.debugElement.query(By.css('#submit')).nativeElement;
    btn.click();
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
