import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

fdescribe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let de: DebugElement;
  let el: HTMLElement;
  const emptyInput = '';
  const invalidEmail = 'test';
  const validEmail = 'test@test.dk';
  const invalidPassword = '12345';
  const validPassword = 'Pcm27wbi!';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, AppRoutingModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid upon creation', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be invalid when EMAIL empty', () => {
    component.loginForm.controls['email'].setValue(emptyInput);
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be invalid when PASSWORD empty', () => {
    component.loginForm.controls['password'].setValue(emptyInput);
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be invalid when EMAIL wrong pattern', () => {
    component.loginForm.controls['password'].setValue(validPassword);
    component.loginForm.controls['email'].setValue(invalidEmail);
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be invalid when PASSWORD wrong pattern', () => {
    component.loginForm.controls['password'].setValue(invalidPassword);
    component.loginForm.controls['email'].setValue(validEmail);
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be valid when ALL inputs are valid', () => {
    component.loginForm.controls['password'].setValue(validPassword);
    component.loginForm.controls['email'].setValue(validEmail);
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('submit button should NOT be active, when form is invalid', () => {
    fixture.detectChanges();
    let debugEl: DebugElement = fixture.debugElement.query(By.css('#submit'));
    expect(debugEl.nativeElement.disabled).toBeTrue();
  });

  it('submit button should be active, when form is valid', () => {
    component.loginForm.controls['password'].setValue(validPassword);
    component.loginForm.controls['email'].setValue(validEmail);
    fixture.detectChanges();

    let debugEl: DebugElement = fixture.debugElement.query(By.css('#submit'));

    expect(debugEl.nativeElement.disabled).toBeFalse();
    expect(debugEl.nativeElement.disabled).toEqual(component.loginForm.invalid);
  });

  it('calls onSubmit when button is pressed', () => {
    spyOn(component, 'onSubmit');
    component.loginForm.controls['password'].setValue(validPassword);
    component.loginForm.controls['email'].setValue(validEmail);
    fixture.detectChanges();

    let btn = fixture.debugElement.query(By.css('#submit')).nativeElement;
    btn.click();
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
