import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { By } from '@angular/platform-browser';
import { LoginServiceMock } from 'src/app/services/MOCKS/login-service-mock.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let de: DebugElement;
  let el: HTMLElement;
  let mockService = new LoginServiceMock();
  let emptyInput = '';
  let nonEmptyInput = 'Test Tester';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
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
});
