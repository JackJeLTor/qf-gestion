import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrescriptionsPage } from './prescriptions.page';

describe('PrescriptionsPage', () => {
  let component: PrescriptionsPage;
  let fixture: ComponentFixture<PrescriptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
