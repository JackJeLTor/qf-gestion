import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlPage } from './quality-control.page';

describe('QualityControlPage', () => {
  let component: QualityControlPage;
  let fixture: ComponentFixture<QualityControlPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
