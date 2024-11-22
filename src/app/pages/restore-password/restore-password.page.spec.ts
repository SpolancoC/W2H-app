import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestorePasswordPage } from './restore-password.page';

describe('RecuperarClavePage', () => {
  let component: RestorePasswordPage;
  let fixture: ComponentFixture<RestorePasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
